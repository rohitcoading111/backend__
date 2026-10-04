import mongoose from "mongoose";
import config from "../config/config.js";
import User from "../models/user.models.js";

const promoteInstructors = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("DB connected successfully");

    const instructorEmails = config.INSTRUCTOR_EMAIL
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (instructorEmails.length === 0) {
      throw new Error("No instructor emails provided");
    }

    for (const email of instructorEmails) {
      const user = await User.findOne({ email });

      if (!user) {
        console.log(`${email} → user not found`);
        continue;
      }

      if (user.role === "INSTRUCTOR") {
        console.log(`${email} → already an instructor`);
        continue;
      }

      user.role = "INSTRUCTOR";
      await user.save();

      console.log(`${email} → promoted to INSTRUCTOR`);
    }

    console.log("Instructor promotion process completed");
  } catch (error) {
    console.error("Error promoting instructors:", error);
  } finally {
    await mongoose.disconnect();
    console.log("DB disconnected");
  }
};

promoteInstructors();