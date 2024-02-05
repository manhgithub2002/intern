import express from "express";
import { hello, login, loginWithFirebase, logout, register } from "../controllers/auth.controller";
import { checkAuth } from "../middleware/checkAuth.middleware";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/login-firebase", loginWithFirebase)
router.get("/logout/:id", logout)
router.get("/hello",checkAuth, hello);
// router.get("/hello", hello);

export default router;
