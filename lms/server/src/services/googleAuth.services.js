
import User from "../models/user.models.js";

export const findOrCreateGoogleUser = async (googleUser) => {
  const { googleId, name, email, emailVerified, avatar } = googleUser;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!googleId || !normalizedEmail || emailVerified !== true) {
    throw new Error("GOOGLE_ACCOUNT_NOT_VERIFIED");
  }

  // 1. Already-linked Google user
  const googleLinkedUser = await User.findOne({ googleId });

  if (googleLinkedUser) {
    return {
      user: googleLinkedUser,
      isNewUser: false,
    };
  }

  // 2. Existing account with the same verified email
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    // Only link automatically when the existing account's
    // email was already verified by your application.
    if (existingUser.isVerified !== true) {
      throw new Error("GOOGLE_ACCOUNT_LINK_REQUIRED");
    }

    if (
      existingUser.googleId &&
      existingUser.googleId !== googleId
    ) {
      throw new Error("ANOTHER_GOOGLE_ACCOUNT_LINKED");
    }

    existingUser.googleId = googleId;

    if (!existingUser.avatar?.url && avatar) {
      existingUser.avatar = {
        ...existingUser.avatar?.toObject?.(),
        url: avatar,
        fileId: existingUser.avatar?.fileId || null,
      };
    }

    await existingUser.save();

    return {
      user: existingUser,
      isNewUser: false,
    };
  }

  // 3. New Google user
  const newUser = await User.create({
    googleId,
    name: name?.trim() || "Google User",
    email: normalizedEmail,
    password: undefined,
    isVerified: true,
    avatar: {
      url: avatar || null,
      fileId: null,
    },
  });

  return {
    user: newUser,
    isNewUser: true,
  };
};
