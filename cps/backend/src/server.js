import { PORT } from "./utils/config.js";
import { connectDB } from "./database/connect.db.js";

import app from "./app.js";
import { createServer } from "http";

const startServer = async () => {
  try {
    await connectDB();

    const server = createServer(app);

    server.prependListener("request", (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
