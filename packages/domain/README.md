# Domain Package

`@trimatlas/domain` contains shared enterprise domain contracts that can be consumed by API, web, database, and test code.

## Current Contents

- Canonical role list
- Permission list
- Role-to-permission matrix
- Organization, user, and membership validation schemas

RBAC is intentionally centralized here so the frontend can render permission-aware UI while the backend remains the enforcement point.
