# Auth Package

`@trimatlas/auth` contains authentication primitives shared by backend services and tests.

## Current Contents

- HMAC JWT session signing for tests/local workflows
- JWT verification for API authentication middleware
- Tenant-scoped session claims including user ID, email, organization ID, and role

Supabase integration will be layered on top of this boundary so request authentication can validate externally issued access tokens while preserving the same internal session claims shape.
