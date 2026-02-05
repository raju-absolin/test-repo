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

// Dangerous: insecure redirect
router.get("/vuln-redirect", (req, res) => {
  const url = req.query.url as string;
  res.redirect(url);
});
