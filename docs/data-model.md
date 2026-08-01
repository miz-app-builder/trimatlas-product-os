# Data Model

## Overview

Defines core data modeling principles for TrimAtlas Product OS.

## Modeling Principles

- Clear entities
- Consistent relationships
- Data validation
- Scalable storage patterns

## Core Entities

```text
User
Organization
Product
Activity
Analytics
```

## Guidelines

Models should be documented, versioned, and reviewed as the system evolves.

## Future Evolution

Data models should support new features and business requirements.


## Implemented Enterprise Data Foundation

The current Drizzle schema establishes tenant-scoped tables for organizations, users, memberships, audit logs, suppliers, factories, products, inventory items, inventory movements, orders, order lines, and analytics events. Product module tables include `organization_id` to support strict tenant isolation across API queries and audit records.
