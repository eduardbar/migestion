# Repository Guidelines

## How to Use This Guide

- Start here for cross-project norms. MiGestion is a monorepo with two components: API and Web.
- Each component has specific patterns documented in the skills below.
- Component-specific skills override general TypeScript/React patterns when guidance conflicts.

## Available Skills

Use these skills for detailed patterns on-demand:

### Generic Skills (Any Project)

| Skill        | Description                                   | URL                                    |
| ------------ | --------------------------------------------- | -------------------------------------- |
| `typescript` | Strict TypeScript, const types, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-18`   | React 18 patterns, hooks, forwardRef          | [SKILL.md](skills/react-18/SKILL.md)   |
| `vite`       | Vite build tool, aliases, config patterns     | [SKILL.md](skills/vite/SKILL.md)       |
| `tailwind`   | Tailwind CSS, cn utility, design system       | [SKILL.md](skills/tailwind/SKILL.md)   |
| `playwright` | Page Object Model, E2E testing patterns       | [SKILL.md](skills/playwright/SKILL.md) |
| `jest`       | Unit testing, mocking, fixtures               | [SKILL.md](skills/jest/SKILL.md)       |
| `zod-3`      | Zod validation schemas, refinements           | [SKILL.md](skills/zod-3/SKILL.md)      |
| `zustand-4`  | Zustand stores, actions, slices               | [SKILL.md](skills/zustand-4/SKILL.md)  |

### MiGestion-Specific Skills

| Skill                | Description                                          | URL                                            |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `migestion`          | Project overview, component navigation, architecture | [SKILL.md](skills/migestion/SKILL.md)          |
| `migestion-api`      | Express + Prisma patterns, modules, validation       | [SKILL.md](skills/migestion-api/SKILL.md)      |
| `migestion-web`      | React + Vite + Zustand patterns, design system       | [SKILL.md](skills/migestion-web/SKILL.md)      |
| `migestion-prisma`   | Prisma ORM patterns, multi-tenant queries            | [SKILL.md](skills/migestion-prisma/SKILL.md)   |
| `migestion-test-api` | API testing with Jest + Supertest                    | [SKILL.md](skills/migestion-test-api/SKILL.md) |
| `migestion-test-web` | Web E2E testing with Playwright                      | [SKILL.md](skills/migestion-test-web/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action                                                         | Skill                |
| -------------------------------------------------------------- | -------------------- |
| Creating/modifying API modules (controller/service/repository) | `migestion-api`      |
| Creating/modifying React components/pages                      | `migestion-web`      |
| Writing/modifying Prisma queries/migrations                    | `migestion-prisma`   |
| Creating/modifying Zod validation schemas                      | `zod-3`              |
| Writing/modifying Zustand stores                               | `zustand-4`          |
| Writing API unit tests                                         | `migestion-test-api` |
| Writing/modifying E2E tests                                    | `migestion-test-web` |
| General project questions                                      | `migestion`          |
| Writing/modifying TypeScript types/interfaces                  | `typescript`         |
| Writing React components                                       | `react-18`           |
| Writing/modifying Tailwind styles                              | `tailwind`           |

---

## Project Overview

MiGestion is a multi-tenant SaaS CRM for local businesses with enterprise-grade architecture.

| Component | Location        | Tech Stack                                                                |
| --------- | --------------- | ------------------------------------------------------------------------- |
| API       | `packages/api/` | Node.js 20, Express 4, TypeScript 5, Prisma, MySQL 8, Redis 7             |
| Web       | `packages/web/` | React 18, TypeScript 5, Vite 5, Tailwind CSS, Zustand 4, TanStack Query 5 |

## Quick Commands

```bash
# Global
npm install              # Install dependencies
npm run dev              # Start both services
npm run build            # Build all
npm run test             # Test all
npm run lint             # Lint all

# API
npm run dev:api          # Start API dev server (http://localhost:3000)
npm run build:api        # Build API
npm run test:api         # Run API unit tests
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database

# Web
npm run dev:web          # Start Web dev server (http://localhost:5173)
npm run build:web        # Build Web
npm run test:web         # Run Web unit tests
npm run test:e2e         # Run E2E tests

# Docker
docker-compose up -d     # Start infrastructure
docker-compose down      # Stop infrastructure
```

## Core Features

- **Multi-tenant Architecture** - Complete tenant data isolation
- **JWT Authentication** - Token-based auth with refresh tokens and rotation
- **Role-based Access Control** - Owner, Admin, Manager, User roles
- **Client Management** - Full CRUD with search, filters, pagination
- **Interaction Tracking** - Calls, emails, meetings, notes, tasks
- **Client Segmentation** - Custom segments with criteria
- **Advanced Reports** - Dashboard with KPIs and charts
- **Real-time Notifications** - Socket.IO integration
- **Comprehensive Audit** - Complete audit trail

## Commit Style

Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `style`, `test`

## Related Skills

- `migestion-api` - Backend patterns (Express, Prisma, modules)
- `migestion-web` - Frontend patterns (React, Zustand, design system)
- `migestion-prisma` - Database patterns (multi-tenant queries)
- `typescript` - TypeScript strict patterns
- `react-18` - React component patterns
