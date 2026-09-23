import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({
            email
        });

        if (user) {
            return res.status(409).json({
                message: "user already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash
        });

        return res.status(201).json({
            message: "user created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};