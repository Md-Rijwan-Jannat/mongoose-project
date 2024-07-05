import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { RouteError } from "./app/middleware/notFound";
import { GlobalError } from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

// Parsers middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Application routes
app.use("/api/v1", router);

// Test route
const test = async (req: Request, res: Response) => {
  try {
    const a = 10;
    res.send(`The value is ${a}`); // Sending a valid response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.get("/", test);

// Route not found handler
app.use("*", RouteError);

// Global error handler
app.use(GlobalError);

export default app;
