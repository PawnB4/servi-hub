import { Router } from "express";
import {
  login,
  profile,
  signout,
  signup,
  updateUser,
  getAllUserServices
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);

router.put("/login", updateUser);

router.post("/signout", signout);

router.post("/signup", signup);

router.get("/profile", profile);

export default router;
