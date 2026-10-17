import User from "../models/User.js";

export const findOrCreateGoogleUser = async (googleUser) => {
  const {
    googleId,
    name,
    email,
    emailVerified,
    avatar,
  } = googleUser;

  if (!googleId || !email || !emailVerified) {
    throw new Error("Verified Google account is required");
  }

  // Google ID se existing account check karo
  let user = await User.findOne({ googleId });

  if (user) {
    return { user, isNewUser: false };
  }

  // Existing email wale account ko automatically link mat karo.
  // Account linking ko separate, secure flow mein handle karenge.
  const existingEmailUser = await User.findOne({ email });

  if (existingEmailUser) {
    throw new Error(
      "An account with this email already exists. Please use the existing login method first."
    );
  }

  // Naya Google user create karo
  user = await User.create({
    googleId,
    name,
    email,
    password: undefined,
    isVerified: true,
    avatar: {
      url: avatar || null,
      fileId: null,
    },
  });

  return { user, isNewUser: true };
};
