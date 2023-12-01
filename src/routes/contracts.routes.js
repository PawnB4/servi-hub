import Router from "express-promise-router";
import {
  createContract,
  updateContract,
  getServiceContracts,
  deleteContract,
  deleteAllContracts,
} from "../controllers/contracts.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createContractSchema,
  updateContractSchema,
} from "../schemas/contracts.schema.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Contract:
 *      type: object
 *      properties:
 *        contract_id:
 *          type: number
 *          description: Identificador único del contrato generado automaticamente
 *        contract_message:
 *          type: string
 *          description: Mensaje explicativo del motivo de la solicitud
 *        contract_mail:
 *          type: string
 *          description: Dirección de correo del solicitante
 *        contract_phone:
 *          type: string
 *          description: Numero de telefono del solicitante
 *        contract_status:
 *          type: string
 *          description: Estado del contrato
 *        service_id:
 *          type: number
 *          description: Identificador del servicio asociado al contrato
 *        contract_date:
 *          type: string
 *          description: Fecha de creación del contrato
 *      example:
 *        contract_id: 6
 *        service_id: 14
 *        contract_message: Hi, I am interested in this!
 *        contract_mail: example@mail.com
 *        contract_phone: 123456789
 *        contract_status: Solicitado
 *        contract_date: 2023-08-22 18:20:00
 *  parameters:
 *    service_id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *      description: Identificador unico del servicio 
 *    contract_id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: number
 *      description: Identificador unico del contrato 
 */

/**
 * @swagger
 * tags:
 *  name: Contratos
 *  description: Endpoints relacionados a los contratos
 */


/**
 * @swagger
 * /api/contracts:
 *  post:
 *    summary: Crea un contrato para un servicio
 *    tags: [Contratos]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                contract_message:
 *                  type: string
 *                  description: Mensaje explicativo del motivo de la solicitud
 *                contract_mail:
 *                  type: string
 *                  description: Dirección de correo del solicitante
 *                contract_phone:
 *                  type: string
 *                  description: Numero de telefono del solicitante
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado al contrato
 *              example:
 *                contract_phone: 123456789
 *                contract_message: Hi, I am interested in this!
 *                contract_mail: example@mail.com
 *                service_id: 8
 *    responses:
 *      201:
 *        description: Contrato creado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                contract_message:
 *                  type: string
 *                  description: Mensaje explicativo del motivo de la solicitud
 *                contract_mail:
 *                  type: string
 *                  description: Dirección de correo del solicitante
 *                contract_phone:
 *                  type: string
 *                  description: Numero de telefono del solicitante
 *                service_id:
 *                  type: number
 *                  description: Identificador del servicio asociado al contrato
 *              example:
 *                contract_phone: 123456789
 *                contract_message: Hi, I am interested in this!
 *                contract_mail: example@mail.com
 *                service_id: 8
 *      500:
 *        description: Error de servidor
 *            
 */

router.post("/contracts", validateSchema(createContractSchema), createContract);

/**
 * @swagger
 * /api/contracts:
 *  put:
 *    summary: Actualiza el estado de un contrato
 *    tags: [Contratos]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                contract_status:
 *                  type: string
 *                  description: Nuevo estado del contrato
 *                contract_id:
 *                  type: number
 *                  description: Identificador del contrato
 *              example:
 *                contract_phone: 123456789
 *                contract_message: Hi, I am interested in this!
 *                contract_mail: example@mail.com
 *                service_id: 8
 *    responses:
 *      204:
 *        description: Contrato actualizado con éxito
 *      500:
 *        description: Error de servidor
 *            
 */

router.put(
  "/contracts",
  isAuth,
  validateSchema(updateContractSchema),
  updateContract
);

/**
 * @swagger
 * /api/service-contracts/{id}:
 *  delete:
 *    summary: Elimina todos los contratos asociados a un servicio
 *    tags: [Contratos]
 *    parameters:
 *      - $ref: '#/components/parameters/service_id'
 *    responses:
 *      204:
 *        description: Contratos eliminados
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

router.delete("/service-contracts/:id", isAuth, deleteAllContracts);

/**
 * @swagger
 * /api/contracts/{id}:
 *  delete:
 *    summary: Elimina un contrato por id
 *    tags: [Contratos]
 *    parameters:
 *      - $ref: '#/components/parameters/contract_id'
 *    responses:
 *      204:
 *        description: Contrato eliminado
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
 *                message: Contrato no encontrado
 */

router.delete("/contracts/:id", isAuth, deleteContract);

/**
 * @swagger
 * /api/contracts/{id}:
 *  get:
 *    summary: Obtiene los contratos asociados a un servicio
 *    tags: [Contratos]
 *    parameters:
 *      - $ref: '#/components/parameters/service_id'
 *    responses:
 *      200:
 *        description: La lista de contratos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Contract'
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

router.get("/contracts/:id", isAuth, getServiceContracts);

export default router;
