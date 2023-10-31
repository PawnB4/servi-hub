import Router  from "express-promise-router";
import {
  login,
  profile,
  signout,
  signup,
  updateUser,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.put("/login", updateUser);

router.post("/signout", signout);

router.post("/signup", signup);

router.get("/profile",isAuth, profile);

export default router;
