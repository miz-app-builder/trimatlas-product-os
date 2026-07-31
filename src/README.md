# Source Code Structure

## Overview

This directory contains the core implementation of TrimAtlas Product OS.

## Recommended Modules

```text
src/
  application/
    use-cases/
    services/

  domain/
    entities/
    models/
    rules/

  infrastructure/
    database/
    integrations/
    external-services/

  shared/
    utilities/
    constants/
    helpers/
```

## Development Principles

- Keep business logic separated from infrastructure concerns
- Build reusable components
- Maintain clear module boundaries
- Follow testing and review standards

## Adding New Features

New features should include:

- Clear domain requirements
- Appropriate tests
- Documentation updates
- Review approval

## Continuous Improvement

The source structure should evolve as TrimAtlas Product OS grows.
