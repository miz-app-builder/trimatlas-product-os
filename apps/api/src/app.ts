import cors from "cors";
import express, { type Request, type Response } from "express";
import helmet from "helmet";
import { nanoid } from "nanoid";
import pinoHttp from "pino-http";
import { healthRouter } from "./routes/health.js";
import { meRouter } from "./routes/me.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ genReqId: () => nanoid() }));

  app.use(healthRouter);
  app.use(meRouter);

  app.use((_request: Request, response: Response) => {
    response.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } });
  });

  return app;
}
