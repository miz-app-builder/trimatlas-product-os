# Docker Deployment

## Overview

Docker configuration and containerization practices.

## Guidelines

- Use reproducible images
- Keep containers lightweight
- Secure runtime configuration


## Implemented Local Stack

The local Docker stack now includes PostgreSQL, Redis, and the TrimAtlas API image. Start it with:

```bash
docker compose -f deployment/docker/docker-compose.yml up --build
```

The API is exposed on port `4000`, PostgreSQL on `5432`, and Redis on `6379`. The API container uses `deployment/docker/Dockerfile.api`.
