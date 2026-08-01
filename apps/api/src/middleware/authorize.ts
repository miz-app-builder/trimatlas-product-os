import type { NextFunction, Request, Response } from "express";
import { roleHasPermission, type Permission } from "@trimatlas/domain";

export function authorize(permission: Permission) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const role = request.session?.role;
    if (!role || !roleHasPermission(role, permission)) {
      response.status(403).json({ error: { code: "FORBIDDEN", message: "Permission denied" } });
      return;
    }
    next();
  };
}
