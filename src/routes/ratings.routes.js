import Router from "express-promise-router";
import { createRating } from "../controllers/ratings.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createRatingSchema } from "../schemas/ratings.schema.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Rating:
 *      type: object
 *      properties:
 *        rating_id:
 *          type: number
 *          description: Identificador único de la calificación generado automaticamente
 *        rating:
 *          type: number
 *          description: Valor del rating, de 1 a 5
 *        service_id:
 *          type: number
 *          description: Identificador del servicio asociado a las calificaciones
 *        created_at:
 *          type: string
 *          description: Fecha de creación de la calificación
 *      example:
 *        rating_id: 1 
 *        service_id: 3
 *        rating: 3
 *        created_at: 2023-08-22 18:20:00
 */

/**
 * @swagger
 * tags:
 *  name: Calificaciones
 *  description: Endpoints relacionados a las calificaciones
 */

/**
 * @swagger
 * /api/ratings:
 *  post:
 *    summary: Crea una calificación asociada a un servicio
 *    tags: [Calificaciones]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                rating:
 *                  type: number
 *                  description: Valor de la calificación, de 1 a 5
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado a la calificación
 *              example:
 *                rating: 3
 *                service_id: 5
 *    responses:
 *      200:
 *        description: Calificación creado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                rating:
 *                  type: number
 *                  description: Valor de la calificación, de 1 a 5
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado a la calificación
 *              example:
 *                rating: 3
 *                service_id: 5
 *      500:
 *        description: Error de servidor
 *            
 */

router.post("/ratings", validateSchema(createRatingSchema), createRating);

export default router;
