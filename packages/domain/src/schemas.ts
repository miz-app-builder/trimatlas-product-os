import { z, type infer as zInfer } from "zod";
import { roles } from "./rbac.js";

export const uuidSchema = z.string().uuid();

export const organizationSchema = z.object({
  id: uuidSchema,
  name: z.string().min(1).max(160),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export const userSchema = z.object({
  id: uuidSchema,
  email: z.string().email(),
  displayName: z.string().min(1).max(160),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export const membershipSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,
  organizationId: uuidSchema,
  role: z.enum(roles),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export type Organization = zInfer<typeof organizationSchema>;
export type User = zInfer<typeof userSchema>;
export type Membership = zInfer<typeof membershipSchema>;
