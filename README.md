# MiGestion

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18-green" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-20-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-ready-blue" alt="Docker" />
</p>

**Multi-tenant SaaS CRM for local businesses** - A professional, enterprise-grade CRM system designed for scalability and maintainability.

## 🚀 Features

### Core Functionality
- ✅ **Multi-tenant Architecture** - Complete data isolation per tenant
- ✅ **JWT Authentication** - Secure token-based auth with refresh tokens and rotation
- ✅ **Role-based Access Control** - Owner, Admin, Manager, User roles with hierarchical permissions
- ✅ **Client Management** - Full CRUD with search, filters, pagination, and bulk operations
- ✅ **Interaction Tracking** - Log calls, emails, meetings, notes, and tasks
- ✅ **Client Segmentation** - Organize clients with custom segments and criteria
- ✅ **Advanced Reports** - Dashboard with KPIs, charts, and trend analysis
- ✅ **Real-time Notifications** - Socket.IO integration for live updates
- ✅ **Comprehensive Audit** - Complete audit trail for all operations

### Technical Highlights
- 🔐 **Security by Default** - Password hashing, JWT rotation, RBAC, sensitive field redaction
- 📊 **Analytics Ready** - Recharts integration for beautiful visualizations
- ⚡ **High Performance** - Redis caching, optimized database queries, code splitting
- 🧪 **Containerized** - Docker Compose with MySQL, Redis, and application services
- ✅ **Fully Tested** - 114 unit tests + 44 E2E tests with Playwright
- 📖 **Documented API** - OpenAPI 3.0 with Swagger UI at `/api/docs`

## 🛠️ Tech Stack

### Backend
```
Node.js 20.x      - Runtime
Express 4.x         - Web framework
TypeScript 5.x       - Type safety
Prisma ORM         - Database toolkit
MySQL 8.0           - Relational database
Redis 7              - Caching layer
Socket.IO             - Real-time WebSocket
Jest                 - Unit testing
```

### Frontend
```
React 18.x           - UI library
TypeScript 5.x       - Type safety
Vite 5.x             - Build tool & dev server
Tailwind CSS         - Styling
Zustand              - State management
TanStack Query         - Data fetching
Recharts              - Data visualization
Playwright            - E2E testing
```

### Infrastructure
```
Docker               - Containerization
Docker Compose        - Service orchestration
GitHub Actions         - CI/CD pipeline
```

## 📁 Project Structure

```
migestion/
├── packages/
│   ├── api/                    # Backend Node.js + Express
│   │   ├── src/
│   │   │   ├── config/         # Configuration and constants
│   │   │   ├── infrastructure/  # Prisma, Redis, Socket.IO
│   │   │   ├── modules/        # Business logic (auth, clients, etc.)
│   │   │   └── shared/         # Middleware, utils, errors
│   │   ├── tests/            # Jest unit tests
│   │   └── prisma/           # Migrations and seed
│   │
│   └── web/                    # Frontend React + Vite
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   ├── pages/         # Feature pages
│       │   ├── contexts/      # React contexts
│       │   ├── hooks/         # Custom hooks
│       │   ├── services/      # API integration
│       │   ├── stores/        # Zustand stores
│       │   └── lib/           # Utilities
│       └── e2e/             # Playwright E2E tests
│
├── docker/                  # Dockerfiles
├── .github/workflows/        # CI/CD
└── docker-compose.yml         # Local development
```

## 🏗️ Architecture Principles

Following **Clean Code** (Robert C. Martin) and **Refactoring** (Martin Fowler & Kent Beck):

- ✅ **Single Responsibility** - Each module has one clear purpose
- ✅ **Open/Closed Principle** - Extendable, not modified
- ✅ **Liskov Substitution** - Interfaces for flexibility
- ✅ **Interface Segregation** - Focused, minimal interfaces
- ✅ **Dependency Inversion** - Depend on abstractions, not concretions

### Design Patterns Applied
- **Repository Pattern** - Database access abstraction
- **DTO Pattern** - Clean data transfer objects
- **Middleware Pattern** - Cross-cutting concerns (auth, RBAC, audit)
- **Factory Pattern** - Error creation
- **Singleton Pattern** - Database client, Redis connection
- **Observer Pattern** - Socket.IO event system

## 🎨 Design System

**Minimalist, Professional Enterprise Aesthetic**

- Color Palette: Neutral scale (white, black, grays)
- Typography: Clean, readable, enterprise-focused
- Components: Border-based design, no heavy shadows
- Charts: Recharts with professional styling
- Responsive: Mobile-first with Tailwind breakpoints
- **NO gradients** in UI (only chart fills)
- **NO heavy shadows** (border-based instead)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0
- Docker and Docker Compose (optional, recommended)

### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd migestion

# Install dependencies
npm install

# Start infrastructure
docker-compose up -d

# Run development servers
npm run dev

# API: http://localhost:3000
# Web: http://localhost:5173
# Swagger: http://localhost:3000/api/docs
```

### Running Tests

```bash
# Backend unit tests (114 tests)
npm run test:api

# Frontend E2E tests (44 tests)
npm run test:e2e

# With coverage
npm run test:api -- --coverage
```

### Building for Production

```bash
# Build all packages
npm run build

# Build backend only
npm run build:api

# Build frontend only
npm run build:web
```

## 📊 Testing Coverage

| Suite | Tests | Status |
|---------|--------|--------|
| Backend Unit | 114 | ✅ Passing |
| Frontend E2E | 44 | ✅ Passing |
| Total | 158 | ✅ All green |

## 📝 Code Quality

### Metrics
- **Lines of Code**: 26,316
- **Source Files**: 174 (.ts/.tsx)
- **Test Coverage**: >80% on critical paths
- **Build Size**: Optimized with 17 code chunks

### Commit Convention
Follows [Conventional Commits](https://www.conventionalcommits.org/):
```
feat:     New feature
fix:       Bug fix
refactor:  Code improvement
test:      Adding tests
chore:     Maintenance task
docs:      Documentation
```

## 🔐 Security

- 🔒 **JWT with Refresh Tokens** - Token rotation, revocation, configurable expiry
- 🔒 **Password Security** - bcrypt hashing, strength validation, salt rounds
- 🔒 **RBAC** - Role hierarchy, permission checks on all routes
- 🔒 **Multi-tenant Isolation** - All queries scoped by tenantId
- 🔒 **Input Validation** - Zod schemas on all endpoints
- 🔒 **Rate Limiting** - Configurable limits per endpoint
- 🔒 **Audit Trail** - All CRUD operations logged with sensitive field redaction

## 📈 Performance Optimizations

- **Code Splitting**: React.lazy() for pages, manual chunks for vendors
- **Redis Caching**: Notification cache, session management
- **Database Indexing**: Indexed columns for fast queries
- **Pagination**: Cursor-based for large datasets
- **Optimized Bundles**: 17 chunks, vendor-charts (422KB), vendor-react (163KB)

## 🌐 API Documentation

Interactive Swagger UI available at `/api/docs` when running:

- Full OpenAPI 3.0 specification
- Request/response schemas for all endpoints
- Authentication examples
- Try-it-out functionality

## 🧪 Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Environment Variables

See `.env.example` for required variables:
- Database connection
- JWT secrets
- Redis URL
- CORS origin
- Port configuration

## 📄 License

MIT License - See LICENSE file for details

## 👥 Credits

Designed and developed as a portfolio project demonstrating:
- Full-stack development skills
- Enterprise architecture patterns
- Clean Code principles
- SaaS multi-tenant design
- Professional CI/CD practices

---

**Built with ❤️ using modern web technologies and best practices**
