import { log } from "node:console";
import { User } from "../models/user.model.js";

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
export{
    createUser
}