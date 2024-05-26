import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { ErrorHandler } from "./app/middleware/errorHandler";
import router from "./app/routes";

// parsers
app.use(express.json());
app.use(express.text());
app.use(cors());

// Logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  next();
};
// server initialization
app.get("/", (req: Request, res: Response) => {
  res.send("This mongoose server is running");
});

// Application routes
app.use("/api/v1", logger, router);

// Route not found handler
app.use("*", ErrorHandler.notFoundErrorHandler);

// Global error handler
app.use(ErrorHandler.globalErrorHandler);

export default app;
