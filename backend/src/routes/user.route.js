import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { log } from "node:console";

const router = Router();
// Create a new user
router.post('/register', createUser);

// User login
router.post('/login', loginUser);

//logout user
router.post('/logout', logoutUser);

export default router;