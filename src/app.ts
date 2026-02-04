

// Outdated/unsafe library simulation (pretend this is an old version)
import * as qs from "qs"; // qs < 6.0.0 is vulnerable to prototype pollution
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Messy code: unused variables, inconsistent formatting, duplicate code, bad naming
let unused = 123
const foo = 'bar';
function badStyle( ) {return 2+2;;}
var x=1;var y=2;let z=3;function f(){return x+y+z;};
let unused2 = 'abc';
const BAD_SECRET = 'badsecret';
const hardcodedCreds = {user: 'root', pass: 'toor'};
const adminToken = 'admin-token-123';
const AWS_SECRET = 'AKIAIOSFODNN7EXAMPLE';
const AWS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const DB_CONN = 'postgres://admin:admin@localhost:5432/db';
const oldApiKey = '12345-OLD-API-KEY';

// More hardcoded credentials (for demo only)
const HARDCODED_JWT_SECRET = "jwtsecret123!";
const HARDCODED_ADMIN_EMAIL = "admin@example.com";
const HARDCODED_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----";
const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.danger.payload";
// Dangerous code: command injection (simulated)
import { exec } from "child_process";
app.get("/vuln-cmd", (req, res) => {
  const cmd = req.query.cmd as string;
  // Dangerous: unsanitized user input in command execution
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

// Prototype pollution via qs (simulated)
app.get('/vuln-qs', (req, res) => {
  // Example: /vuln-qs?__proto__[polluted]=true
  const parsed = qs.parse(req.query);
  res.json({ parsed, polluted: ({} as any).polluted });
});
// Vulnerable endpoint: reflected XSS
app.get("/vuln-xss", (req, res) => {
  const name = req.query.name || "world";
  // Dangerous: unsanitized user input in response
  res.send(`<h1>Hello, ${name}</h1>`);
});

// Dangerous: leaking secrets in error
app.get('/vuln-leak', (req, res) => {
  try {
    throw new Error('Something went wrong!');
  } catch (e) {
    res.status(500).send(`Error: ${(e as Error).message}. Secret: ${HARDCODED_JWT_SECRET}`);
  }
});

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
let a=1;let b=2;let c=3;function d(){return a+b+c;}
const unusedObj = {a:1,b:2};
var pointless = 'pointless';
// Outdated pattern: callback hell
function callbackHell(cb){setTimeout(()=>{setTimeout(()=>{setTimeout(()=>{cb('done')},100)},100)},100)}
callbackHell((msg)=>console.log(msg));

export default app;
