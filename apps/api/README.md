# TrimAtlas API

The API app is the first executable backend for TrimAtlas Product OS. It is an Express service written in TypeScript and designed to host REST endpoints for the enterprise Product OS modules.

## Current Capabilities

- `/health` health endpoint
- `/ready` readiness endpoint
- `/v1/me` authenticated session endpoint
- Helmet security headers
- CORS middleware
- JSON request body limits
- Pino HTTP request logging
- JWT session verification
- Role-based authorization using shared domain permissions

## Local Development

```bash
npm install
npm run dev:api
```

The API listens on `PORT` or `4000` by default.

## Required Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | API port | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | local TrimAtlas URL |
| `AUTH_JWT_SECRET` | HMAC secret for JWT validation; minimum 32 characters | development-only default |

Production deployments must provide a strong `AUTH_JWT_SECRET` through a secret manager.
