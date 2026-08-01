# TrimAtlas Product OS Master Implementation Plan

**Plan date:** 2026-08-01  
**Target:** Production-ready enterprise Product OS using TypeScript, React, Next.js, TailwindCSS, shadcn/ui, Node.js, Express, PostgreSQL, Drizzle ORM, Supabase, Redis, Docker, GitHub Actions, Vitest, Playwright, and OpenAPI.

## Guiding Principles

- Extend the current repository structure instead of replacing it without cause.
- Keep every batch runnable and reviewable.
- Pair implementation with documentation, tests, and architecture updates.
- Prefer vertical slices that prove complete product behavior over disconnected scaffolding.
- Treat security, observability, and operations as core platform requirements.

## Target Monorepo Architecture

```text
trimatlas-product-os/
  apps/
    web/                  # Next.js frontend
    api/                  # Express REST API
  packages/
    config/               # Shared TS/ESLint/Prettier/Tailwind configuration
    db/                   # Drizzle schema, migrations, seed utilities
    domain/               # Shared domain types and validation schemas
    ui/                   # shadcn/ui-based component library
    api-contracts/        # OpenAPI source and generated clients/types
    observability/        # Logging, metrics, tracing helpers
  deployment/
    docker/               # Dockerfiles and compose files
    kubernetes/           # K8s manifests/Helm or Kustomize overlays
    monitoring/           # Dashboards and alert rules
    backup/               # Backup jobs and restore docs
  docs/                   # Architecture and product documentation
  tests/
    unit/
    integration/
    e2e/
```

The existing `backend/`, `frontend/`, `src/`, and `modules/` documentation directories should remain as historical/contextual docs until equivalent implementation docs are linked or migrated. New executable code should live under `apps/` and `packages/` to avoid ambiguity.

## Batch Roadmap

### Batch 1 — Monorepo Foundation

**Goal:** Create a runnable, standards-driven TypeScript workspace.

Deliverables:

- Root `package.json`, workspace configuration, lockfile, and Node version policy.
- Shared TypeScript, ESLint, Prettier, EditorConfig, and Git ignore configuration.
- Initial `apps/web`, `apps/api`, and core `packages/*` directories.
- Vitest configuration and first smoke tests.
- CI workflow that installs, lints, typechecks, tests, and builds.
- Documentation updates for setup and architecture.

Acceptance criteria:

- `npm install` or chosen package-manager install succeeds.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` are defined.
- CI runs real checks instead of placeholders.

### Batch 2 — Web and API Skeleton

**Goal:** Provide the first runnable user interface and backend service.

Deliverables:

- Next.js application with TailwindCSS and base shadcn/ui setup.
- Express API with health, readiness, version, error handling, request ID, CORS, helmet, rate limit, and structured logging middleware.
- Shared environment validation.
- Web-to-API health integration.
- Unit and integration tests for health and middleware behavior.

Acceptance criteria:

- Local web and API dev servers start independently.
- Health endpoints are documented and tested.
- Frontend renders an operational dashboard landing page.

### Batch 3 — Database and OpenAPI Foundation

**Goal:** Establish persistent data contracts.

Deliverables:

- PostgreSQL Docker Compose service.
- Drizzle ORM package with schema, migrations, and seed command.
- OpenAPI 3.1 source document for platform health and initial identity/org APIs.
- API request/response validation using shared schemas.
- Migration and contract tests.

Acceptance criteria:

- Database migrations run locally and in CI service containers.
- OpenAPI contract validates in CI.
- API responses match documented schemas.

### Batch 4 — Authentication, Tenancy, RBAC, and Audit Logs

**Goal:** Secure the platform's core access model.

Deliverables:

- Supabase auth integration plan and implementation boundary.
- Organization-scoped user model.
- Roles, permissions, memberships, invitations, and service account model.
- Express authentication middleware and authorization guards.
- Audit log schema and append-only audit service.
- Security tests for unauthenticated, unauthorized, cross-tenant, and privileged flows.

Acceptance criteria:

- Every protected endpoint enforces tenant context and permissions.
- Audit logs capture security-relevant actions.
- RBAC matrix is documented and tested.

### Batch 5 — Core Product Modules

**Goal:** Implement initial enterprise Product OS domain capabilities.

Deliverables:

- Products module with variants, attributes, lifecycle status, and search-ready metadata.
- Suppliers module with contacts, compliance status, and product relationships.
- Factories module with capabilities, regions, certifications, and supplier relationships.
- Inventory module with locations, stock movements, reservations, and adjustment audit trails.
- REST endpoints, OpenAPI docs, domain services, Drizzle schema, and UI screens for each module.

Acceptance criteria:

- Modules support CRUD, list filtering, pagination, validation, permissions, and audit logs.
- Unit, integration, and Playwright tests cover primary workflows.

### Batch 6 — Workflow, Notifications, Files, Media, and Search

**Goal:** Add cross-cutting product operations.

Deliverables:

- Workflow engine for approval/review states.
- Notification service with in-app and email-ready providers.
- File/media metadata service with signed upload/download architecture.
- Search indexing abstraction using PostgreSQL initially and external search later if needed.
- UI patterns for task queues, notifications, and attachments.

Acceptance criteria:

- Workflows are configurable and auditable.
- Notifications are permission-aware and testable.
- File access is tenant-scoped and signed.

### Batch 7 — Analytics and Reporting

**Goal:** Provide operational and product intelligence.

Deliverables:

- Analytics event schema and ingestion service.
- Reporting endpoints for inventory, supplier performance, product lifecycle, and user activity.
- Dashboard UI with filters, charts, and export-ready data tables.
- Metrics documentation and privacy controls.

Acceptance criteria:

- Reports are tenant-scoped, tested, and performant for expected data volumes.
- Analytics collection avoids sensitive data leakage.

### Batch 8 — Production Operations and Deployment

**Goal:** Make the platform deployable and operable.

Deliverables:

- Dockerfiles for web and API.
- Docker Compose for local full stack.
- Kubernetes manifests or Helm/Kustomize overlays for staging/production.
- Liveness/readiness probes, resource requests/limits, config maps, secrets references.
- Backup and restore automation for PostgreSQL.
- Monitoring dashboards, alert rules, structured logs, metrics, tracing, and runbook updates.

Acceptance criteria:

- A clean clone can run the full stack locally.
- Staging deployment manifests are validated in CI.
- Backup and restore procedures are tested and documented.

### Batch 9 — Security, Compliance, Performance, and Release Hardening

**Goal:** Reach enterprise production quality.

Deliverables:

- Threat model, data classification, security headers, CSP, dependency scanning, secret scanning, SAST, and container scanning.
- Performance budgets and load-test baseline.
- Accessibility test coverage.
- Release checklist, rollback drills, incident response drills, and DR exercise evidence.
- Production readiness checklist and go-live criteria.

Acceptance criteria:

- Security and quality gates run in CI.
- Critical workflows meet availability, latency, accessibility, and security standards.
- Operations documentation contains concrete commands and owners.

## Prioritization Rationale

1. **Foundation before features:** Prevents architectural drift and duplicate code.
2. **Auth and tenancy before enterprise data:** Prevents retrofitting access control after sensitive data exists.
3. **Audit logs early:** Enterprise systems need traceability from the first protected action.
4. **Vertical slices:** Each module should include database, API, UI, docs, and tests together.
5. **Operations throughout:** Deployment, monitoring, backup, and security must mature alongside product features.

## Definition of Done for Every Batch

- Code compiles and the project remains runnable.
- Tests are added or updated at the correct level.
- Documentation and architecture references are updated.
- OpenAPI contracts are updated for API changes.
- Database migrations are reversible or recovery-documented.
- Security and tenant isolation implications are reviewed.
- CI passes with real checks.
- Changes are committed as a logical unit.

## Immediate Next Step

Proceed with **Batch 1 — Monorepo Foundation** after this audit and plan are reviewed. Batch 1 should avoid domain feature implementation and focus on executable workspace scaffolding, quality tooling, CI, and setup documentation.
