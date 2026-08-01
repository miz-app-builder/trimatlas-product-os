import request from "supertest";
import { describe, expect, it } from "vitest";
import { signSession } from "@trimatlas/auth";
import { createApp } from "./app.js";

const app = createApp();
const secret = "development-secret-change-before-production";

describe("API app", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/health").expect(200);
    expect(response.body).toEqual({ status: "ok", service: "trimatlas-api" });
  });

  it("requires authentication for current user", async () => {
    const response = await request(app).get("/v1/me").expect(401);
    expect(response.body.error.code).toBe("UNAUTHENTICATED");
  });

  it("returns tenant-scoped session for authenticated users", async () => {
    const token = await signSession({
      sub: "11111111-1111-4111-8111-111111111111",
      email: "owner@example.com",
      organizationId: "22222222-2222-4222-8222-222222222222",
      role: "owner"
    }, secret);

    const response = await request(app).get("/v1/me").set("Authorization", `Bearer ${token}`).expect(200);
    expect(response.body.data).toMatchObject({ email: "owner@example.com", role: "owner" });
  });
});
