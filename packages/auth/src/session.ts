import { SignJWT, jwtVerify } from "jose";
import { z, type infer as zInfer } from "zod";
import { roles, type Role } from "@trimatlas/domain";

const sessionClaimsSchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
  organizationId: z.string().uuid(),
  role: z.enum(roles)
});

export type SessionClaims = zInfer<typeof sessionClaimsSchema>;

function secretKey(secret: string): Uint8Array {
  if (secret.length < 32) {
    throw new Error("AUTH_JWT_SECRET must contain at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(claims: SessionClaims, secret: string): Promise<string> {
  return new SignJWT({ email: claims.email, organizationId: claims.organizationId, role: claims.role satisfies Role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey(secret));
}

export async function verifySession(token: string, secret: string): Promise<SessionClaims> {
  const verified = await jwtVerify(token, secretKey(secret));
  return sessionClaimsSchema.parse({ ...verified.payload, sub: verified.payload.sub });
}
