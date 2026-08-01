import type { NextFunction, Request, Response } from "express";
import { verifySession, type SessionClaims } from "@trimatlas/auth";
import { apiConfig } from "../config.js";

declare global {
  namespace Express {
    interface Request {
      session?: SessionClaims;
    }
  }
}

export async function authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
  const header = request.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    response.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Bearer token is required" } });
    return;
  }

  try {
    request.session = await verifySession(token, apiConfig.AUTH_JWT_SECRET);
    next();
  } catch {
    response.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Bearer token is invalid" } });
  }
}
