import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import type MessageResponse from "./interfaces/message-response.js";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";


const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Example of a safe login endpoint (no hardcoded secrets, no SQLi)
app.post("/login", (req, res) => {
  // This is a placeholder. In a real app, use a database and hashed passwords.
  res.status(501).json({ message: "Not implemented. Use a secure authentication provider." });
});

app.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Safe XSS-free endpoint
app.get("/vuln-xss", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : "";
  // Return as JSON to avoid XSS
  res.json({ name });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
