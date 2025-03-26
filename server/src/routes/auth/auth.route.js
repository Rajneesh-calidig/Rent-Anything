import express from "express";
import { getUser, login, logout, signup } from "../../controllers/auth.controller.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.post("/register",signup)
router.get("/user", protectRoute, getUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;