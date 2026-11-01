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
  existingAdmin.role = "ADMIN";
  existingAdmin.accountType = "BUSINESS";
  existingAdmin.adminType = "SUPER_ADMIN";

  await existingAdmin.save();

  console.log("Existing Admin updated as Super Admin");
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
  accountType: "BUSINESS",
  adminType: "SUPER_ADMIN",
});

    console.log("Admin created successfully:", admin.email);

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();