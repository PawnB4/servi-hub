import { Router } from "express";
import {
  createComment,
  getServiceComments,
  updateComment,
} from "../controllers/comments.controller.js";

const router = Router();


router.post("/comments", createComment);

router.put("/comments", updateComment);

router.get("/comments/:id", getServiceComments);
