import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_request, response) => {
  response.json({ status: "ok", service: "trimatlas-api" });
});

healthRouter.get("/ready", (_request, response) => {
  response.json({ status: "ready", dependencies: { database: "configured" } });
});
