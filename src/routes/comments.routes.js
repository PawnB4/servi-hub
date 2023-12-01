import Router from "express-promise-router";
import {
  createComment,
  getServiceComments,
  updateComment,
} from "../controllers/comments.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../schemas/comments.schema.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        comment_id:
 *          type: number
 *          description: Identificador único del comentario generado automaticamente
 *        comment_text:
 *          type: string
 *          description: Cuerpo del comentario
 *        comment_enabled:
 *          type: boolean
 *          description: Indica si el comentario está habilitado o no
 *        service_id:
 *          type: number
 *          description: Identificador del servicio asociado al comentario
 *        created_at:
 *          type: string
 *          description: Fecha de creación del comentario
 *      example:
 *        comment_id: 12 
 *        service_id: 8
 *        comment_text: Looking forward to more content.
 *        comment_enabled: 0
 *        created_at: 2023-08-22 18:20:00
 *  parameters:
 *    service_id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *      description: Identificador unico del servicio 
 */

/**
 * @swagger
 * tags:
 *  name: Comentarios
 *  description: Endpoints relacionados a los comentarios
 */

/**
 * @swagger
 * /api/comments:
 *  post:
 *    summary: Crea un comentario asociado a un servicio
 *    tags: [Comentarios]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                comment_text:
 *                  type: string
 *                  description: Cuerpo del comentario
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado al comentario
 *              example:
 *                comment_text: Looking forward to more content.
 *                service_id: 8
 *    responses:
 *      200:
 *        description: Comentario creado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                comment_text:
 *                  type: string
 *                  description: Cuerpo del comentario
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado al comentario
 *              example:
 *                comment_text: Looking forward to more content.
 *                service_id: 8
 *      500:
 *        description: Error de servidor
 *            
 */

router.post("/comments", validateSchema(createCommentSchema), createComment);

/**
 * @swagger
 * /api/comments:
 *  put:
 *    summary: Actualiza el estado de comentarios
 *    tags: [Comentarios]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                new_state:
 *                  type: boolean
 *                  description: Nuevo estado al que pasará el comentario
 *                id_list:
 *                  type: array
 *                  description: Lista de ID's de comentarios que pasarán al nuevo estado 
 *                  items:
 *                    type: number
 *                    description: ID del comentario
 *              example:
 *                new_state: 1
 *                id_list: [2,5,6,8,14,12]
 *    responses:
 *      200:
 *        description: Comentarios actualizados con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje de estado
 *              example:
 *                message: Changes saved successfully
 *      500:
 *        description: Error de servidor
 *            
 */

router.put(
  "/comments",
  isAuth,
  validateSchema(updateCommentSchema),
  updateComment
);

/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *    summary: Obtiene los comentarios asociados a un servicio
 *    tags: [Comentarios]
 *    parameters:
 *      - $ref: '#/components/parameters/service_id'
 *    responses:
 *      200:
 *        description: La lista de comentarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 *      404:
 *        description: Servicio no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: Servicio no encontrado
 */

router.get("/comments/:id", getServiceComments);

export default router;
