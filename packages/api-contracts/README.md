# API Contracts

`@trimatlas/api-contracts` contains the canonical OpenAPI contract for public TrimAtlas Product OS REST endpoints.

The initial contract covers health, readiness, and authenticated session endpoints. All future REST API work must update `openapi.yaml` in the same batch as route implementation and tests.
