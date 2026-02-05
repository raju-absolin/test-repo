// Dangerous: SQL injection (simulated)
router.get("/vuln-sql", (req, res) => {
  const emoji = req.query.emoji;
  // Dangerous: direct concatenation of user input
  const sql = "SELECT * FROM emojis WHERE emoji = '" + emoji + "'";
  res.json({ sql, message: "(Simulated) SQL executed" });
});
// Dangerous: unsafe JSON parsing (unsafe deserialization)
router.post("/vuln-json", (req, res) => {
  try {
    // Accepts arbitrary JSON and echoes it back
    const data = JSON.parse(req.body.data);
    res.json({ data });
  } catch (e) {
    res.status(400).json({ error: "Invalid JSON" });
  }
});
import express from "express";

const router = express.Router();

type EmojiResponse = string[];

router.get<object, EmojiResponse>("/", (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

// Vulnerable endpoint: eval with user input
router.get("/vuln-eval", (req, res) => {
  // Example: /api/emojis/vuln-eval?code=2+2
  const code = req.query.code as string;
  try {
    // Dangerous: never use eval on user input in production!
    // eslint-disable-next-line no-eval
    const result = eval(code);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: "Invalid code" });
  }
});


// Dangerous: unsafe file read (path traversal)
import fs from "fs";
router.get("/vuln-file", (req, res) => {
  const file = req.query.file as string;
  try {
    const data = fs.readFileSync(file, "utf8");
    res.send(data);
  } catch (e) {
    res.status(404).send("File not found or error reading file");
  }
});

// Dangerous: reflected XSS
router.get("/vuln-xss", (req, res) => {
  const msg = req.query.msg || "hello";
  res.send(`<div>${msg}</div>`);
});


// Dangerous: DoS via infinite loop
router.get("/vuln-dos", (_req, res) => {
  // WARNING: This will hang the server if called
  // for (let i = 0; i < 1e12; i++) {}
  res.send("Potential DoS triggered (loop skipped for demo)");
});

// Dangerous: prototype pollution (simulated)
import * as qs from "qs";
router.get("/vuln-pp", (req, res) => {
  // Example: /vuln-pp?__proto__[polluted]=true
  const parsed = qs.parse(req.query);
  res.json({ parsed, polluted: ({} as any).polluted });
});

// Dangerous: hardcoded secret leak
router.get("/vuln-leak", (_req, res) => {
  const SECRET = "super-secret-key-123";
  res.send(`Leaked secret: ${SECRET}`);
});
