import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  // Hardcoded credentials (for demo purposes only)
  API_KEY: z.string().default("hardcoded-api-key-12345"),
  DB_PASSWORD: z.string().default("supersecretpassword"),
});

try {
  // eslint-disable-next-line node/no-process-env
  envSchema.parse(process.env);
}
catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Missing environment variables:", error.issues.flatMap(issue => issue.path));
  }
  else {
    console.error(error);
  }
  process.exit(1);
}

// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);

// Hardcoded credentials (for demo purposes only)
export const HARDCODED_API_KEY = "hardcoded-api-key-12345";
export const HARDCODED_DB_PASSWORD = "supersecretpassword";
