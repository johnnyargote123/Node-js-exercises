import { Router } from "express";
import {
  login,
  logout,
  register,
  githubAuth,
  githubCallback,
} from "../controllers/sessions.controller.js";
import updateUserRoleMiddleware from "../middlewares/rol.js";
import passport from "passport";

const router = Router();

router.post("/login", updateUserRoleMiddleware, login);

router.post("/logout", logout);

router.post("/register", register);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubAuth
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback
);

export default router;