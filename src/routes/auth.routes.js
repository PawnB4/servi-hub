import Router from "express-promise-router";
import {
  login,
  profile,
  signout,
  signup,
  restorePassword,
  restorePasswordMail,
  updateUser,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  logInSchema,
  signUpSchema,
  updateUserSchema,
} from "../schemas/auth.schema.js";

import multer from "multer";

const upload = multer();

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user_id:
 *          type: number
 *          description: Identificador unico del usuario
 *        first_name:
 *          type: string
 *          description: Nombre del usuario
 *        last_name:
 *          type: string
 *          description: Apellido del usuario
 *        email:
 *          type: string
 *          description: Dirección de correo del usuario
 *        password_hash:
 *          type: string
 *          description: Contraseña encriptada del usuario
 *        degree:
 *          type: string
 *          description: Titulo universitario del usuario
 *        work_experience:
 *          type: string
 *          description: Experiencia de trabajo del usuario
 *        user_profile_image:
 *          type: string
 *          description: URL de la imagen de perfil del usuario
 *        created_at:
 *          type: string
 *          description: Fecha de creación del usuario
 *      example:
 *        user_id: 3
 *        first_name: Federico
 *        last_name: Kravertz
 *        email: example3@mail.com
 *        user_profile_image: https://example.com/image/upload/example.jpg
 *        password_hash: $2b$10$mSBQncEZFd/IEEcHOvuDLueb0SQ3MSpFs6mLIRptKM0G1WryuAfhu
 *        degree: Licenciado en Bellas Artes
 *        work_experience: Como Coordinador Creativo en la Galería InspirArte, lideré la curaduría de exposiciones innovadoras, eventos culturales y colaboré con artistas emergentes y consagrados.
 *        created_at: 2023-09-22 04:22:20
 *    
 *        
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints relacionados a auth
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Crea Cookie de sesión
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                mail:
 *                  type: string
 *                  description: La direccion de correo del usuario
 *                password:
 *                  type: string
 *                  description: La contraseña del usuario
 *              example:
 *                mail: gaston_rodriguez@gmail.com
 *                password: m8ZJC^43
 *    responses:
 *      200:
 *        description: Cookie creada con exito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                user_id:
 *                  type: number
 *                  description: Identificador unico del usuario
 *                status:
 *                  type: string
 *                  description: Estado de la peticion
 *                code:
 *                  type: number
 *                  description: Codigo interno para manejo de errores
 *              example:
 *                user_id: 14
 *                status: success
 *                code: 0
 *      202:
 *        description: Credenciales inválidas
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  description: Descripcion del error
 *                status:
 *                  type: string
 *                  description: Estado de la peticion
 *                code:
 *                  type: number
 *                  description: Codigo interno para manejo de errores
 *              example:
 *                message: Invalid credentials
 *                status: error
 *                code: 1
 * 
 *            
 */

router.post("/login", validateSchema(logInSchema), login);

/**
 * @swagger
 * /api/auth/login:
 *  put:
 *    summary: Resetea contraseña del usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                token:
 *                  type: string
 *                  description: El token generado para poder actualizar la contraseña
 *                password:
 *                  type: string
 *                  description: La contraseña del usuario
 *              example:
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywianRpIjoiMVpVbkg5dlRLQ0R3ZTfwQsfsX2ttIiwiZXhwIjoxNzA1ODc2ODEyLCJpYXQiOjE3MDA2OTI4MTIsIm5iZiI6MTcwMDY5MjgxMn0.ieKdFRUZFkzD4yKZualLhlo7X5SmIIlHRKFh7_at_X0"
 *                password: m23#aZwqC^45f
 *    responses:
 *      200:
 *        description: Contraseña actualizada con exito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                status:
 *                  type: string
 *                  description: Estado de la peticion
 *              example:
 *                status: Password updated successfully
 *      500:
 *        description: Error de servidor
 *            
 */

router.put("/login", restorePassword);

/**
 * @swagger
 * /api/auth/send-mail:
 *  post:
 *    summary: Envia correo al usuario para poder actualizar contraseña
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                mail:
 *                  type: string
 *                  description: La dirección de correo del usuario
 *              example:
 *                mail: gaston_rodriguez@gmail.com
 *    responses:
 *      200:
 *        description: Mail enviado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Estado de la peticion
 *              example:
 *                success: true
 *      500:
 *        description: Error de servidor
 *            
 */

router.post("/send-mail", restorePasswordMail);

/**
 * @swagger
 * /api/auth/signout:
 *  post:
 *    summary: Elimina Cookie de sesión
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Cookie eliminada con éxito
 *      500:
 *        description: Error de servidor
 *            
 */

router.post("/signout", signout);

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Registra usuario y se crea Cookie de sesión
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nombre del usuario
 *                lastName:
 *                  type: string
 *                  description: Apellido del usuario
 *                mail:
 *                  type: string
 *                  description: La direccion de correo del usuario
 *                password:
 *                  type: string
 *                  description: La contraseña del usuario
 *                phone:
 *                  type: string
 *                  description: Numero de telefono del usuario
 *              example:
 *                name: Gaston
 *                lastName: Rodriguez
 *                mail: gaston_rodriguez@gmail.com
 *                phone: 111222333
 *                password: m8ZJC^43
 *    responses:
 *      200:
 *        description: Usuario registrado y Cookie creada con exito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                user_id:
 *                  type: number
 *                  description: Identificador unico del usuario
 *                name:
 *                  type: string
 *                  description: Nombre del usuario
 *                lastName:
 *                  type: string
 *                  description: Apellido del usuario
 *                mail:
 *                  type: string
 *                  description: La direccion de correo del usuario
 *                password:
 *                  type: string
 *                  description: La contraseña del usuario
 *                phone:
 *                  type: string
 *                  description: Numero de telefono del usuario
 *              example:
 *                user_id: 14
 *                name: Gaston
 *                last_name: Rodriguez
 *                mail: gaston_rodriguez@gmail.com
 *                phone: 111222333
 *                password: m8ZJC^43
 *      202:
 *        description: Dirección de correo ya existe
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  description: Descripcion del error
 *                code:
 *                  type: number
 *                  description: Codigo interno para manejo de errores
 *              example:
 *                message: email already exists
 *                code: 1
 */

router.post("/signup", validateSchema(signUpSchema), signup);

/**
 * @swagger
 * /api/auth/profile:
 *  get:
 *    summary: Obtiene los datos del usuario
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Los datos del usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: number
 *                  description: Identificador unico del usuario
 *                name:
 *                  type: string
 *                  description: Nombre del usuario
 *                lastName:
 *                  type: string
 *                  description: Apellido del usuario
 *                mail:
 *                  type: string
 *                  description: La direccion de correo del usuario
 *                degree:
 *                  type: string
 *                  description: Titulo universitario del usuario
 *                work_experience:
 *                  type: string
 *                  description: Experiencia de trabajo del usuario
 *                user_profile_image:
 *                  type: string
 *                  description: URL de la imagen de perfil del usuario
 *      500:
 *        description: Error de servidor
 *        
 */

router.get("/profile", isAuth, profile);

/**
 * @swagger
 * /api/auth/profile:
 *  put:
 *    summary: Actualiza el usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: number
 *              degree:
 *                type: string
 *              work_experience:
 *                type: string
 *              image:
 *                 type: string
 *            required:
 *              - user_id
 *              - degree
 *              - work_experience
 *              - image
 *    responses:
 *      200:
 *        description: Usuario actualizado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                status:
 *                  type: string
 *                  description: Estado de la peticion
 *              example:
 *                status: User updated successfully
 *      500:
 *        description: Error de servidor
 *              
 */

router.put(
  "/profile",
  isAuth,
  upload.any(),
  validateSchema(updateUserSchema),
  updateUser
);

export default router;
