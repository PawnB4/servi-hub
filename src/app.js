import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import servicesRoutes from "./routes/services.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import ratingsRoutes from "./routes/ratings.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));
app.use("/api", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", commentsRoutes);
app.use("/api", ratingsRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
