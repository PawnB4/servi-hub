import { Router } from "express";
import { createRating } from "../controllers/ratings.controller.js";

const router = Router();

router.post("/ratings", createRating);
