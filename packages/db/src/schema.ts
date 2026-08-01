import { integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { roles } from "@trimatlas/domain";

export const roleEnum = pgEnum("role", roles);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
};

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  ...timestamps
}, (table) => ({ slugIdx: uniqueIndex("organizations_slug_idx").on(table.slug) }));

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  ...timestamps
}, (table) => ({ emailIdx: uniqueIndex("users_email_idx").on(table.email) }));

export const memberships = pgTable("memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  role: roleEnum("role").notNull(),
  ...timestamps
}, (table) => ({ userOrgIdx: uniqueIndex("memberships_user_org_idx").on(table.userId, table.organizationId) }));

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  actorUserId: uuid("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});


export const lifecycleStatusEnum = pgEnum("lifecycle_status", ["draft", "active", "archived"]);
export const orderStatusEnum = pgEnum("order_status", ["draft", "submitted", "approved", "in_production", "shipped", "delivered", "cancelled"]);
export const inventoryMovementTypeEnum = pgEnum("inventory_movement_type", ["receipt", "reservation", "release", "shipment", "adjustment"]);

export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  name: text("name").notNull(),
  status: lifecycleStatusEnum("status").notNull(),
  contactEmail: text("contact_email").notNull(),
  ...timestamps
}, (table) => ({ supplierOrgNameIdx: uniqueIndex("suppliers_org_name_idx").on(table.organizationId, table.name) }));

export const factories = pgTable("factories", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  status: lifecycleStatusEnum("status").notNull(),
  ...timestamps
}, (table) => ({ factoryOrgNameIdx: uniqueIndex("factories_org_name_idx").on(table.organizationId, table.name) }));

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  supplierId: uuid("supplier_id").references(() => suppliers.id).notNull(),
  factoryId: uuid("factory_id").references(() => factories.id).notNull(),
  sku: text("sku").notNull(),
  name: text("name").notNull(),
  status: lifecycleStatusEnum("status").notNull(),
  ...timestamps
}, (table) => ({ productOrgSkuIdx: uniqueIndex("products_org_sku_idx").on(table.organizationId, table.sku) }));

export const inventoryItems = pgTable("inventory_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  locationCode: text("location_code").notNull(),
  quantityOnHand: integer("quantity_on_hand").notNull(),
  quantityReserved: integer("quantity_reserved").notNull(),
  ...timestamps
}, (table) => ({ inventoryProductLocationIdx: uniqueIndex("inventory_product_location_idx").on(table.organizationId, table.productId, table.locationCode) }));

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  orderNumber: text("order_number").notNull(),
  status: orderStatusEnum("status").notNull(),
  ...timestamps
}, (table) => ({ ordersOrgNumberIdx: uniqueIndex("orders_org_number_idx").on(table.organizationId, table.orderNumber) }));

export const orderLines = pgTable("order_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  ...timestamps
});

export const inventoryMovements = pgTable("inventory_movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  inventoryItemId: uuid("inventory_item_id").references(() => inventoryItems.id).notNull(),
  movementType: inventoryMovementTypeEnum("movement_type").notNull(),
  quantity: integer("quantity").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  actorUserId: uuid("actor_user_id").references(() => users.id).notNull(),
  eventName: text("event_name").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull()
});
