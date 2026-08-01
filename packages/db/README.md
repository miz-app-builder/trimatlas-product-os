# Database Package

`@trimatlas/db` contains Drizzle ORM schema definitions and migration configuration for PostgreSQL.

## Current Schema

- `organizations`
- `users`
- `memberships`
- `audit_logs`

These tables establish the foundation for organization tenancy, RBAC membership, and append-only security audit trails.

## Commands

```bash
npm run db:generate
npm run db:migrate
```


## Product OS Tables

The schema now includes the first enterprise module tables for suppliers, factories, products, inventory items, inventory movements, orders, order lines, and analytics events. All module tables carry `organization_id` so API services can enforce tenant boundaries consistently with authentication and RBAC middleware.
