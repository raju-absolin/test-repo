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

export default router;
