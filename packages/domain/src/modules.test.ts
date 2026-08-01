import { describe, expect, it } from "vitest";
import { productSchema } from "./modules.js";

describe("product module schemas", () => {
  it("validates tenant-scoped product records", () => {
    const parsed = productSchema.parse({
      id: "33333333-3333-4333-8333-333333333333",
      organizationId: "22222222-2222-4222-8222-222222222222",
      sku: "SKU-001",
      name: "Core Trim Package",
      status: "active",
      supplierId: "44444444-4444-4444-8444-444444444444",
      factoryId: "55555555-5555-4555-8555-555555555555",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(parsed.sku).toBe("SKU-001");
  });
});
