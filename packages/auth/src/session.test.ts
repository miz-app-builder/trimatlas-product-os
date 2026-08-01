import { describe, expect, it } from "vitest";
import { signSession, verifySession } from "./session.js";

const secret = "test-secret-that-is-at-least-32-chars";
const claims = {
  sub: "11111111-1111-4111-8111-111111111111",
  email: "owner@example.com",
  organizationId: "22222222-2222-4222-8222-222222222222",
  role: "owner" as const
};

describe("session tokens", () => {
  it("signs and verifies tenant-scoped claims", async () => {
    const token = await signSession(claims, secret);
    await expect(verifySession(token, secret)).resolves.toMatchObject(claims);
  });

  it("rejects weak secrets", async () => {
    await expect(signSession(claims, "short")).rejects.toThrow(/at least 32 characters/);
  });
});
