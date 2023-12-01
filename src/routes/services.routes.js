import Router from "express-promise-router";
import {
  getAllServices,
  createService,
  deleteService,
  updateService,
  getService,
  getAllUserServices,
} from "../controllers/services.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../schemas/service.schema.js";
import multer from "multer";

const upload = multer();

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Service:
 *      type: object
 *      properties:
 *        service_id:
 *          type: number
 *          description: Identificador único del servicio generado automaticamente
 *        user_id:
 *          type: number
 *          description: Identificador del usuario dueño del servicio
 *        service_image:
 *          type: string
 *          description: URL de la imagen del servicio
 *        service_name:
 *          type: string
 *          description: Nombre del servicio
 *        service_category:
 *          type: string
 *          description: Categoria del servicio
 *        service_description:
 *          type: string
 *          description: Descripcion general de lo que ofrece el servicio
 *        frequency:
 *          type: string
 *          description: Frecuencia con la cual se dará el servicio
 *        duration_minutes:
 *          type: string
 *          description: Duración del servicio en minutos, si aplica
 *        cost:
 *          type: string
 *          description: Costo del servicio
 *        is_active:
 *          type: boolean
 *          description: Indica si el servicio está publicado o no
 *        created_at:
 *          type: string
 *          description: Fecha de creación del servicio
 *      example:
 *        service_id: 24 
 *        user_id: 3
 *        service_name: Clases de Matematicas
 *        service_category: Educacion
 *        service_description: Domina las matemáticas con nuestras clases especializadas. Aprende de manera clara y efectiva. ¡Descubre el placer de resolver problemas!
 *        service_image: https://example.com/image/upload/example.jpg
 *        frequency: 2/semana
 *        duration_minutes: 60
 *        is_active: 1
 *        created_at: 2023-11-17 04:36:40
 *  parameters:
 *    service_id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *      description: Identificador unico del servicio
 *    
 *        
 */

/**
 * @swagger
 * tags:
 *  name: Servicios
 *  description: Endpoints relacionados a los servicios
 */

/**
 * @swagger
 * /api/services:
 *  get:
 *    summary: Obtiene todos los servicios con los datos del proveedor que lo creó
 *    tags: [Servicios]
 *    responses:
 *      200:
 *        description: La lista de servicios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
 */

router.get("/services", getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *  get:
 *    summary: Obtiene un servicio por id
 *    tags: [Servicios]
 *    parameters:
 *      - $ref: '#/components/parameters/service_id'
 *    responses:
 *      200:
 *        description: Un servicio servicio único
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
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

router.get("/services/:id", getService);

/**
 * @swagger
 * /api/user-services:
 *  get:
 *    summary: Obtiene todos los servicios asociados a un usuario
 *    tags: [Servicios]
 *    responses:
 *      200:
 *        description: La lista de servicios de un usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
 */

router.get("/user-services", isAuth, getAllUserServices);

/**
 * @swagger
 * /api/services:
 *  post:
 *    summary: Crea un nuevo servicio
 *    tags: [Servicios]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: number
 *              service_image:
 *                type: string
 *              service_name:
 *                type: string
 *              service_category:
 *                 type: string
 *              service_description:
 *                type: string
 *              frequency:
 *                type: string
 *              duration_minutes:
 *                type: string
 *              cost:
 *                type: string
 *            required:
 *              - user_id
 *              - service_image
 *              - service_name
 *              - service_category
 *              - service_description
 *              - frequency
 *              - duration_minutes
 *              - cost
 *    responses:
 *      200:
 *        description: El servicio creado con éxito
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/Service'
 *      500:
 *        description: Error de servidor
 *              
 */

router.post(
  "/services",
  isAuth,
  upload.any(),
  validateSchema(createServiceSchema),
  createService
);

/**
 * @swagger
 * /api/services:
 *  put:
 *    summary: Actualiza un servicio
 *    tags: [Servicios]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              service_id:
 *                type: number
 *              service_image:
 *                type: string
 *              service_name:
 *                type: string
 *              service_category:
 *                 type: string
 *              service_description:
 *                type: string
 *              frequency:
 *                type: string
 *              duration_minutes:
 *                type: string
 *              cost:
 *                type: string
 *            required:
 *              - service_id
 *    responses:
 *      200:
 *        description: El servicio actualizado con éxito
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/Service'
 *      500:
 *        description: Error de servidor
 *              
 */

router.put(
  "/services",
  isAuth,
  upload.any(),
  validateSchema(updateServiceSchema),
  updateService
);

/**
 * @swagger
 * /api/services/{id}:
 *  delete:
 *    summary: Eliminar un servicio por id
 *    tags: [Servicios]
 *    parameters:
 *      - $ref: '#/components/parameters/service_id'
 *    responses:
 *      204:
 *        description: Servicio eliminado
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

router.delete("/services/:id", isAuth, deleteService);

export default router;
