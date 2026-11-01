
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import User from "../models/user.models.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("DB has been connected");

    // Check if Super Admin already exists
    const existingAdmin = await User.findOne({
      email: config.ADMIN_EMAIL.toLowerCase().trim(),
    });

    // Update existing account
    if (existingAdmin) {
      existingAdmin.role = "ADMIN";
      existingAdmin.accountType = "BUSINESS";
      existingAdmin.adminType = "SUPER_ADMIN";
      existingAdmin.sellerStatus = "APPROVED";

      await existingAdmin.save();

      console.log("Existing user updated as Super Admin");
      console.log("Super Admin Email:", existingAdmin.email);

      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD,
      12
    );

    // Create new Super Admin
    const admin = await User.create({
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL.toLowerCase().trim(),
      password: hashedPassword,

      role: "ADMIN",
      accountType: "BUSINESS",
      adminType: "SUPER_ADMIN",
      sellerStatus: "APPROVED",

      isVerified: true,
    });

    console.log("Super Admin created successfully:", admin.email);

  } catch (error) {
    console.error("Error creating Super Admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

createAdmin();
