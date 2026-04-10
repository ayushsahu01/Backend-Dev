import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const sendEmail = (email, link) => {
    console.log(`Sending email to ${email} with link: ${link}`);
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // validate
    if (!name || !email || !password) {
        return res.json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const token = crypto.randomBytes(32).toString("hex");

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken: token
        });
        await newUser.save();
        // verification link
        const link = `http://localhost:7054/auth/verify?token=${token}`;

        sendEmail(email, link);

        res.status(200).json({ message: "Registered, verify email" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const verifyEmail = async (req, res) => {
    const token = req.query.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
}

export const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({message: "All fields are required"});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not exists"});
    }

    if(!user.isVerified){
        return res.status(400).json({message: "Verify your Email first"});
    }

    const isMatched = bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = await jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.status(200).json({message: "Login successful", token, user});
}

export const forgetPassword = async(req, res) => {
    const { email} = req.body;

    const user = await User.findOne({email});
    if(!email){
        return res.json({message: "user not found"});
    }
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const link = `http://localhost:7054/auth/verify?token=${token}`;
    sendEmail(email, link);

    res.status(200).json({message: "Password reset link sent to email"});
}

export const resetPassword = async(req, res) => {
    const { newPassword, token } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    })

    if(!user){
        return res.status(400).json({message: "Invalid or expired token"});
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({message: "Password reset successful"});
}