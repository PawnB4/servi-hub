import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import servicesRoutes from "./routes/services.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import contractsRoutes from "./routes/contracts.routes.js";
import ratingsRoutes from "./routes/ratings.routes.js";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions.js";
import { FRONTEND_URL } from "./config.js";
import { conn } from "./db.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const specs = swaggerJsDoc(options);

//Routes

app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));
app.get("/api/ping", async (req, res) => {
  const pingResponse = await conn.execute("SELECT NOW()");
  return res.json(pingResponse.rows[0]);
});
app.use("/api", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", commentsRoutes);
app.use("/api", ratingsRoutes);
app.use("/api", contractsRoutes);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
