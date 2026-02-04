
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


// Vulnerable endpoint: insecure file upload (no validation)
import multer from "multer";
const upload = multer({ dest: "uploads/" });
app.post("/vuln-upload", upload.single("file"), (req, res) => {
  // No file type or size validation
  res.send(`File uploaded: ${req.file?.originalname}`);
});

// Vulnerable endpoint: open redirect
app.get("/vuln-redirect", (req, res) => {
  const url = req.query.url as string;
  // Dangerous: redirecting to user-supplied URL
  res.redirect(url);
});

// Vulnerable endpoint: unsafe regex (ReDoS)
app.post("/vuln-regex", (req, res) => {
  const input = req.body.input;
  // Dangerous: catastrophic backtracking possible
  const regex = /(a+)+$/;
  const match = regex.test(input);
  res.json({ match });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


// More messy code
const unusedArr = [1,2,3];
function anotherBad( ) { return foo + 1; }

export default app;
