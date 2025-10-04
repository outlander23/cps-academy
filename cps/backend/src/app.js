import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Set security headers
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// APIS routes
app.use("/v1/api", router);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use(errorHandler);

export default app;
