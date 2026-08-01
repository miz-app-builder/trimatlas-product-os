import { config } from "dotenv";
import { z, type infer as zInfer } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url().default("postgres://trimatlas:trimatlas@localhost:5432/trimatlas"),
  AUTH_JWT_SECRET: z.string().min(32).default("development-secret-change-before-production")
});

export type ApiConfig = zInfer<typeof envSchema>;
export const apiConfig = envSchema.parse(process.env);
