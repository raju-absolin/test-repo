import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import type MessageResponse from "./interfaces/message-response.js";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";

// Hardcoded credentials (for testing purposes only)
const DB_USER = "admin";
const DB_PASS = "password123";
const SECRET_KEY = "supersecretkey";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Vulnerable endpoint: SQL injection (for testing only)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Simulate vulnerable SQL query (do not use in production!)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  // Fake result for demonstration
  if (username === DB_USER && password === DB_PASS) {
    res.json({ message: "Login successful", token: SECRET_KEY });
  } else {
    res.status(401).json({ message: "Invalid credentials", query });
  }
});

app.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
