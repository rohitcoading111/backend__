import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import User from "../models/user.models.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("DB has been connected");

    const existingAdmin = await User.findOne({
      email: config.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD,
      12
    );

    const admin = await User.create({
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin created successfully:", admin.email);

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();