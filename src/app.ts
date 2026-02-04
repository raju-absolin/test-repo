
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Messy code: unused variables, inconsistent formatting
let unused = 123
const foo = 'bar';
function badStyle( ) {return 2+2;;}

import type MessageResponse from "./interfaces/message-response.js";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";

const app = express( );


app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.json())


app.get<object, MessageResponse>("/", (req, res) => {
res.json({message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",});
});


// Vulnerable endpoint: SQL injection (simulated)
app.post("/vuln-sql", (req, res) => {
  // Simulate SQL injection vulnerability
  const username = req.body.username;
  const password = req.body.password;
  // Dangerous: constructing SQL with user input
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  // Simulate result
  res.json({ query, message: "(Simulated) SQL executed" });
});

// Vulnerable endpoint: insecure deserialization

// Vulnerable endpoint: path traversal (simulated)
import fs from "fs";
app.get("/vuln-path", (req, res) => {
  const file = req.query.file as string;
  // Dangerous: reading files based on user input (no sanitization)
  try {
    const data = fs.readFileSync(file, "utf8");
    res.send(data);
  } catch (e) {
    res.status(404).send("File not found or error reading file");
  }
});

app.post("/vuln-deserialize", (req, res) => {
  try {
    // Dangerous: using eval to deserialize user input
    // eslint-disable-next-line no-eval
    const obj = eval('(' + req.body.data + ')');
    res.json({ obj });
  } catch (e) {
    res.status(400).json({ error: "Deserialization failed" });
  }
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


// More messy code
const unusedArr = [1,2,3];
function anotherBad( ) { return foo + 1; }

export default app;
