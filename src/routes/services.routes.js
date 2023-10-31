import Router from "express-promise-router";
import {
  getAllServices,
  createService,
  deleteService,
  updateService,
  getService,
} from "../controllers/services.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/services",  getAllServices);

router.get("/services/:id", getService);

router.post("/services",isAuth, createService);

router.put("/services/:id",isAuth, updateService);

router.delete("/services/:id",isAuth, deleteService);

// TODO - Obtener todos los servicios de un determinado usuario

export default router;
