import { z, type infer as zInfer } from "zod";
import { uuidSchema } from "./schemas.js";

export const lifecycleStatuses = ["draft", "active", "archived"] as const;
export const orderStatuses = ["draft", "submitted", "approved", "in_production", "shipped", "delivered", "cancelled"] as const;
export const inventoryMovementTypes = ["receipt", "reservation", "release", "shipment", "adjustment"] as const;

const timestamps = {
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
};

export const supplierSchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  name: z.string().min(1).max(180),
  status: z.enum(lifecycleStatuses),
  contactEmail: z.string().email(),
  ...timestamps
});

export const factorySchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  name: z.string().min(1).max(180),
  region: z.string().min(1).max(120),
  status: z.enum(lifecycleStatuses),
  ...timestamps
});

export const productSchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  sku: z.string().min(1).max(80),
  name: z.string().min(1).max(180),
  status: z.enum(lifecycleStatuses),
  supplierId: uuidSchema,
  factoryId: uuidSchema,
  ...timestamps
});

export const inventoryItemSchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  productId: uuidSchema,
  locationCode: z.string().min(1).max(80),
  quantityOnHand: z.coerce.number().int(),
  quantityReserved: z.coerce.number().int(),
  ...timestamps
});

export const orderSchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  orderNumber: z.string().min(1).max(80),
  status: z.enum(orderStatuses),
  ...timestamps
});

export const analyticsEventSchema = z.object({
  id: uuidSchema,
  organizationId: uuidSchema,
  actorUserId: uuidSchema,
  eventName: z.string().min(1).max(160),
  occurredAt: z.coerce.date()
});

export type Supplier = zInfer<typeof supplierSchema>;
export type Factory = zInfer<typeof factorySchema>;
export type Product = zInfer<typeof productSchema>;
export type InventoryItem = zInfer<typeof inventoryItemSchema>;
export type Order = zInfer<typeof orderSchema>;
export type AnalyticsEvent = zInfer<typeof analyticsEventSchema>;
