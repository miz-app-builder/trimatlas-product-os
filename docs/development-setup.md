# Development Setup

## Overview

This guide describes the initial development environment setup for TrimAtlas Product OS.

## Requirements

Before starting development, ensure access to:

- Required development tools
- Project documentation
- Source code repository
- Development dependencies

## Setup Process

### 1. Prepare Environment

Install and configure required tools and dependencies.

### 2. Configure Project

Set up:

- Environment configuration
- Local development settings
- Required services

### 3. Validate Setup

Confirm:

- Project builds successfully
- Development workflow works correctly
- Tests can run locally

## Development Practices

Follow:

- Engineering standards
- Code review process
- Testing guidelines
- Documentation updates

## Continuous Improvement

Development setup instructions should be updated as TrimAtlas Product OS tooling and workflows evolve.


## Current Workspace Commands

Install dependencies and run the executable backend bootstrap:

```bash
npm install
npm run dev:api
```

Run validation checks:

```bash
npm run typecheck
npm run test
npm run build
```

Database migration commands are available after configuring `DATABASE_URL`:

```bash
npm run db:generate
npm run db:migrate
```


## Docker Development Stack

Run the local infrastructure stack with:

```bash
docker compose -f deployment/docker/docker-compose.yml up --build
```

This starts PostgreSQL, Redis, and the API service with development defaults from `.env.example`.
