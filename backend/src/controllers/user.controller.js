import { log } from "node:console";
import User from "../models/user.models.js";

const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Create a new user
        const user = await User.create({ username, password, email, loggedIn: false });
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                loggedIn: user.loggedIn
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Compare the entered password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Update the user's loggedIn status
        user.loggedIn = true;
        await user.save();
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                loggedIn: user.loggedIn
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Update the user's loggedIn status
        user.loggedIn = false;
        await user.save();
        res.status(200).json({
            message: "User logged out successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                loggedIn: user.loggedIn
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export{
    createUser,
    loginUser,
    logoutUser
}