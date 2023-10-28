import { Router } from "express";
import {
  getAllServices,
  createService,
  deleteService,
  updateService,
  getService,
} from "../controllers/services.controller.js";

const router = Router();

router.get("/services", getAllServices);

router.get("/services/:id", getService);

router.post("/services", createService);

router.put("/services/:id", updateService);

router.delete("/services/:id", deleteService);

// TODO - Obtener todos los servicios de un determinado usuario

export default router;
