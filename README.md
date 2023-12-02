# TPO - APLICACIONES INTERACTIVAS - UADE 2023

Servi Hub - Tu destino para encontrar servicios personalizados

## Documentación

- _Documentación de Endpoints:_ Localmente con Swagger. Ejecutá el backend y en el navegador accedé a la URI `/api/docs`. La URL por defecto suele ser `http://localhost:3000/api/docs`

- _Requerimientos:_ https://docs.google.com/document/d/1mKrfIPMAamfZdZf-P_84x8s5JxNmDBUkoCXJubA-vxg/edit?usp=sharing

- _Diagrama de BD:_ https://asset.cloudinary.com/ddx4fkbj5/93bd415573ea1a7234b0ddb162ea22d9

## BACKEND

Express js CRUD API

### Aspectos Técnicos

- _Stack:_ Node.js, Express.js, PlanetScale.

- _Autenticación:_ JSON Web Tokens para autenticación y autorización. Las contraseñas se almacenan en forma hash.

- _Validación de Datos:_ Las validaciones de los datos proporcionados por los usuarios se realiza con Zod

- _Middlewares:_ Se utilizan middlewares para verificar los tokens de acceso y para validar datos en las rutas.

- _Modelos y Esquemas:_ Se definen schemas de las entidades con Zod.

- _Rutas, Controladores y Servicios:_ Las rutas están organizadas en diferentes archivos y corresponden a las funcionalidades específicas del sistema.

- _Configuración del Entorno:_ Se utiliza el archivo `config.js` para almacenar y exportar variables de entorno, como claves secretas y configuraciones de la base de datos

### Variables de Entorno

Utilizar operador de fusión nula para definir valores locales en el archivo `config.js`

- `PORT`: Puerto de escucha de la aplicación.
- `CLOUDINARY_NAME`: Este es el nombre de tu cuenta en Cloudinary y se utiliza para almacenar imágenes.
- `CLOUDINARY_API_KEY`: Utiliza esta clave API de Cloudinary para autenticar tus solicitudes.
- `CLOUDINARY_API_SECRET`: Esta es la clave API Secret de Cloudinary que garantiza la seguridad en tus solicitudes.
- `RESEND_API_KEY`: Utiliza esta clave API de Resend para enviar correos electrónicos.
- `FROM_EMAIL`: Esta dirección de correo electrónico se usa como remitente en los correos electrónicos enviados a través de Resend.
- `DATABASE_URL`: Aquí debes proporcionar el URL de conexión a tu base de datos de PlanetScale.
- `JWT_SECRET_KEY`: Esta clave secreta se utiliza para firmar los tokens JWT de autenticación.
- `FRONTEND_URL`: Esta es la URL del origen permitido para las solicitudes CORS, especialmente útil durante el desarrollo para permitir solicitudes desde tu frontend local.

## FRONTEND

Dentro la carpeta `frontend` se encuentra la aplicación cliente de Servi Hub.

### Variables de Entorno

Dentro de `frontend` se utiliza un archivo `.env` para setear variable de entorno de Vite

- `VITE_BACKEND_URL`: URL del backend, en desarrollo suele ser `http://localhost:3000`

### Tecnologías

- **React:** Utilizado para desarrollar una interfaz de usuario interactiva.
- **Vite:** Empleado como herramienta de construcción y desarrollo.
- **Tailwind CSS:** Utilizado para el diseño y la estilización.
- **Axios:** Implementado para realizar solicitudes HTTP al backend.
- **React Hook Form:** Utilizado para gestionar formularios y validar datos.
- **JS Cookie, React-Router-Dom, entre otros:** Utilizados para diversas funcionalidades adicionales.

#### Instalación y Ejecución

1. Cloná el repositorio:
2. Instalá las dependencias en root directory: `npm install`
3. Modificá el archivo `config.js` con las variables de entorno propias.
4. Conectate a tu base de datos PlanetScale. Podés hacerlo via la interfaz de línea de comandos (CLI) de PlanetScale, MySQL Workbench u otro método que sea compatible con PlanetScale. Esto implica proporcionar las credenciales de conexión adecuadas, como el nombre de usuario, la contraseña y el nombre de la base de datos. Una vez establecida la conexión a la base de datos, ejecutá el contenido del archivo `init.sql` para crear las tablas y definir el esquema de la base de datos.  
5. En otra terminal, accedé a la carpeta frontend: `cd frontend`
6. Instalá las dependencias: `npm install`
7. Creá un archivo `.env` dentro de `frontend` para setear la variable de entorno de Vite previamente mencionada.
8. Ejecutá en ambas terminales: `npm run dev`
