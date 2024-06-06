import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";

// server is here
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      w: "majority",
      wtimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");

    server = app.listen(config.port, () => {
      console.log(`This server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

main();
// unHandle rejection error handle
process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected! Server is closing .... 😈");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught exception error handler
process.on("uncaughtException", () => {
  console.log("uncaughtException is detected! Server is closing .... 😈");
  process.exit(1);
});
