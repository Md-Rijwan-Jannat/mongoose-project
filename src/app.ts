import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { RouteError } from "./app/middleware/notFound";
import { GlobalError } from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

//parsers middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application routes
app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

// Route not found handler
app.use("*", RouteError);

// Global error handler
app.use(GlobalError);

export default app;
