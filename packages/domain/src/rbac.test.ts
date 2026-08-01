import { describe, expect, it } from "vitest";
import { roleHasPermission } from "./rbac.js";

describe("RBAC policy", () => {
  it("allows owners to read audit logs", () => {
    expect(roleHasPermission("owner", "audit:read")).toBe(true);
  });

  it("prevents members from writing inventory", () => {
    expect(roleHasPermission("member", "inventory:write")).toBe(false);
  });
});
