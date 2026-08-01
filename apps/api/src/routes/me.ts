import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

export const meRouter = Router();

meRouter.get("/v1/me", authenticate, authorize("organizations:read"), (request, response) => {
  response.json({ data: request.session });
});
