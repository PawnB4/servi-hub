import Router  from "express-promise-router";
import { createRating } from "../controllers/ratings.controller.js";

const router = Router();

router.post("/ratings", createRating);

export default router;
