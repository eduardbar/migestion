# 📊 MiGestion: Enterprise-Level Multi-Tenant SaaS CRM

![MiGestion Preview](packages/web/public/og-image.png)

**MiGestion** is an enterprise-level CRM (Customer Relationship Management) platform, designed for local businesses seeking to professionalize their customer management. With multi-tenant architecture, secure authentication, and real-time analytics, MiGestion offers all the necessary tools to transform customer data into strategic decisions.

## 🚀 Key Features

- 🏢 **Multi-Tenant**: Complete data isolation per tenant. Each company operates in its own secure space.
- 🔐 **JWT Authentication**: Token system with automatic refresh, rotation, and revocation for maximum security.
- 👥 **Role-Based Access Control**: 4 hierarchical roles (Owner, Admin, Manager, User) with granular permissions.
- 📇 **Client Management**: Complete CRUD with advanced search, dynamic filters, pagination, and bulk operations.
- 📞 **Interaction Tracking**: Records calls, emails, meetings, notes, and tasks linked to clients.
- 🎯 **Client Segmentation**: Organize clients with custom segments and dynamic criteria.
- 📊 **Advanced Reports**: Dashboard with real-time KPIs, interactive charts, and trend analysis.
- 🔔 **Real-Time Notifications**: Socket.IO integration for instant updates.
- 📋 **Complete Audit**: Detailed logging of all operations with redaction of sensitive fields.

## 🛠️ Tech Stack

| Layer | Technologies |
|------|-------------|
| **Frontend** | React 18, TypeScript 5, Vite 5, TailwindCSS, Zustand 4, TanStack Query 5 |
| **Backend** | Node.js 20, Express 4, TypeScript 5, Prisma ORM |
| **Database** | MySQL 8, Redis 7 |
| **Testing** | Jest (114 tests), Playwright (44 E2E tests) |
| **Real-time** | Socket.IO 4 |
| **Infrastructure** | Docker, Docker Compose, GitHub Actions |
| **Documentation** | OpenAPI 3.0, Swagger UI |

## ⚙️ Environment Setup

### Backend (`packages/api/.env`)

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/migestion"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your_ultra_secure_secret_change_me"
JWT_REFRESH_SECRET="another_different_secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Application
NODE_ENV="development"
PORT=3000
CORS_ORIGIN="http://localhost:5173"

# Logs
LOG_LEVEL="debug"
```

### Frontend (`packages/web/.env`)

```env
VITE_API_URL="http://localhost:3000/api"
VITE_WS_URL="http://localhost:3000"
```

## 📦 Installation and Deployment

### 1. Clone the repository

```bash
git clone https://github.com/your-username/migestion.git
cd migestion
```

### 2. Install dependencies

Install all monorepo dependencies:

```bash
npm install
```

This will automatically install dependencies for both packages (`api` and `web`).

### 3. Configure the database

Start the infrastructure (MySQL and Redis) with Docker:

```bash
docker-compose up -d
```

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Local Development

To run both servers simultaneously:

```bash
npm run dev
```

Or individually:

**Terminal 1 - Backend:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev:web
```

**Available URLs:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
- Swagger Docs: `http://localhost:3000/api/docs`
- Socket.IO: `http://localhost:3000`

### 5. Production Build

```bash
# Complete build (API + Web)
npm run build

# Individual build
npm run build:api
npm run build:web
```

## 📂 Project Structure

```
migestion/
├── packages/
│   ├── api/                     # Backend Node.js + Express
│   │   ├── src/
│   │   │   ├── config/          # Configuration and constants
│   │   │   ├── infrastructure/  # Prisma, Redis, Socket.IO
│   │   │   ├── modules/         # Modularized business logic
│   │   │   │   ├── auth/        # Authentication and authorization
│   │   │   │   ├── tenants/     # Multi-tenant management
│   │   │   │   ├── users/       # Users and roles
│   │   │   │   ├── clients/     # Client CRUD
│   │   │   │   ├── interactions/ # Client interactions
│   │   │   │   ├── segments/    # Segmentation
│   │   │   │   ├── reports/     # Reports and analytics
│   │   │   │   └── notifications/ # Notification system
│   │   │   └── shared/          # Middlewares, utils, errors
│   │   ├── prisma/              # Schema and migrations
│   │   ├── tests/               # Unit tests (Jest)
│   │   └── .env.example
│   │
│   └── web/                     # Frontend React + Vite
│       ├── src/
│       │   ├── components/      # Reusable UI components
│       │   │   ├── ui/          # Base components (Button, Input, etc.)
│       │   │   ├── features/    # Feature components
│       │   │   └── notifications/ # Notification system
│       │   ├── pages/           # Application pages
│       │   │   ├── auth/        # Login, Register
│       │   │   ├── dashboard/   # Main dashboard
│       │   │   ├── clients/     # Client management
│       │   │   ├── interactions/ # Interactions
│       │   │   ├── reports/     # Reports
│       │   │   └── settings/    # Settings
│       │   ├── stores/          # Global state (Zustand)
│       │   ├── services/        # API clients
│       │   ├── hooks/           # Custom hooks
│       │   ├── contexts/        # React contexts
│       │   └── lib/             # Utilities and constants
│       ├── e2e/                 # E2E tests (Playwright)
│       ├── public/              # Static assets
│       └── .env.example
│
├── docker/                      # Dockerfiles
├── .github/workflows/           # CI/CD pipelines
├── docker-compose.yml           # Local orchestration
└── skills/                      # Pattern documentation
```

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|---------------|
| `POST` | `/register` | Register new tenant and owner user | No |
| `POST` | `/login` | Login (returns access + refresh token) | No |
| `POST` | `/refresh` | Renew access token with refresh token | No |
| `POST` | `/logout` | Logout and revoke tokens | Yes |
| `GET` | `/me` | Get authenticated user | Yes |

### Clients (`/api/clients`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `POST` | `/` | Create new client | User |
| `GET` | `/` | List clients with filters and pagination | User |
| `GET` | `/:id` | Get client details | User |
| `PUT` | `/:id` | Update client | User |
| `DELETE` | `/:id` | Delete client (soft delete) | Manager |
| `POST` | `/bulk` | Bulk operation (update/delete) | Manager |

### Interactions (`/api/interactions`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `POST` | `/` | Register new interaction | User |
| `GET` | `/` | List interactions (filters by client, type, date) | User |
| `GET` | `/:id` | Get interaction details | User |
| `PUT` | `/:id` | Update interaction | User |
| `DELETE` | `/:id` | Delete interaction | Manager |

### Segments (`/api/segments`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `POST` | `/` | Create custom segment | Manager |
| `GET` | `/` | List tenant segments | User |
| `GET` | `/:id/clients` | Get segment clients | User |
| `PUT` | `/:id` | Update segment criteria | Manager |
| `DELETE` | `/:id` | Delete segment | Manager |

### Reports (`/api/reports`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `GET` | `/dashboard` | Main dashboard KPIs | User |
| `GET` | `/clients-by-status` | Client distribution by status | User |
| `GET` | `/interactions-timeline` | Interactions timeline | User |
| `GET` | `/user-performance` | User performance | Manager |

### Notifications (`/api/notifications`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `GET` | `/` | List user notifications | User |
| `PUT` | `/:id/read` | Mark as read | User |
| `PUT` | `/read-all` | Mark all as read | User |

### Audit (`/api/audit`)
| Method | Endpoint | Description | Minimum Role |
|--------|----------|-------------|------------|
| `GET` | `/` | List audit logs | Admin |
| `GET` | `/export` | Export logs (CSV/JSON) | Owner |

## 🧪 Testing

### Unit Tests (Backend)

```bash
# Run all tests
npm run test:api

# Watch mode tests
npm run test:api -- --watch

# Tests with coverage
npm run test:api -- --coverage
```

**Current coverage:** 114 tests, >80% on critical routes

### E2E Tests (Frontend)

```bash
# Run E2E tests
npm run test:e2e

# Interactive mode
npm run test:e2e:ui

# Specific tests
npm run test:e2e -- auth.spec.ts
```

**Complete suite:** 44 tests covering:
- Authentication (register, login, logout)
- Complete navigation
- Client CRUD
- Interactions
- Dashboard and reports

### Component Tests (Frontend)

```bash
npm run test:web
```

## 🏗️ Architecture

MiGestion implements **Clean Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│              (Controllers, Routes, Middlewares)              │
│  - HTTP handlers                                             │
│  - Input validation (Zod)                                    │
│  - Auth & RBAC middleware                                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│                  (Services, Use Cases, DTOs)                 │
│  - Business logic orchestration                              │
│  - Transaction management                                    │
│  - Error handling                                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       DOMAIN LAYER                           │
│              (Entities, Interfaces, Types)                   │
│  - Core business entities                                    │
│  - Domain interfaces (repositories, services)                │
│  - Business rules                                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                       │
│           (Prisma, Redis, Socket.IO, External APIs)          │
│  - Database implementation (Prisma)                          │
│  - Caching (Redis)                                           │
│  - Real-time (Socket.IO)                                     │
└─────────────────────────────────────────────────────────────┘
```

### Implemented Design Patterns

- ✅ **Repository Pattern**: Data access abstraction
- ✅ **Service Layer**: Decoupled business logic
- ✅ **DTO Pattern**: Typed data transfer
- ✅ **Middleware Pattern**: Cross-cutting concerns (auth, audit, RBAC)
- ✅ **Factory Pattern**: Error and response creation
- ✅ **Singleton Pattern**: Prisma client, Redis connection
- ✅ **Observer Pattern**: Event system with Socket.IO
- ✅ **Dependency Injection**: Repository injection into services

### SOLID Principles

- **S**ingle Responsibility: Each module has a clear responsibility
- **O**pen/Closed: Extensible without modifying existing code
- **L**iskov Substitution: Consistent and replaceable interfaces
- **I**nterface Segregation: Specific and minimal interfaces
- **D**ependency Inversion: Dependencies towards abstractions

## 🎨 Design System

**Professional Minimalist Aesthetic**

### Color Palette
- **Neutral**: Grayscale (50-950) for base UI
- **Primary**: Professional blue (#2563EB) for main actions
- **Success**: Green (#22C55E) for positive states
- **Warning**: Yellow (#EAB308) for alerts
- **Error**: Red (#EF4444) for errors

### Typography
- **Family**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scales**: xs (0.75rem) → 3xl (2rem)

### Components
- Border-based design (no heavy shadows)
- Consistent border radius (6px)
- Spacing in multiples of 4px
- Smooth transitions (150ms)
- Responsive first with Tailwind breakpoints

### Charts
- Recharts for visualizations
- Neutral colors with blue accents
- Interactive tooltips
- Responsive and accessible

## 🔐 Security

| Category | Implementation |
|-----------|----------------|
| **Authentication** | JWT with access (15min) and refresh tokens (7d) |
| **Passwords** | bcrypt with 10 salt rounds, complexity validation |
| **Authorization** | Hierarchical RBAC with 4 roles and granular permissions |
| **Multi-tenant** | Isolation by `tenantId` in all queries |
| **Validation** | Zod schemas on all endpoints |
| **Rate Limiting** | Configurable limits per route |
| **Audit** | Complete logs with redaction of sensitive fields |
| **Headers** | Helmet.js for secure HTTP headers |
| **CORS** | Strict configuration per environment |

## 📈 Performance

### Implemented Optimizations

- **Code Splitting**: Lazy loading of React pages
- **Vendor Chunks**: Library separation (React, Charts)
- **Redis Caching**: Notification and session caching
- **Database Indexing**: Indexes on frequent columns
- **Pagination**: Cursor-based for large datasets
- **Query Optimization**: Selection of necessary fields only
- **Connection Pooling**: Prisma with connection pool
- **Compression**: Gzip on HTTP responses

### Metrics

- **Build Size**: ~600KB (gzipped)
- **First Load**: <2s with cache
- **API Response**: <100ms (simple queries)
- **Lighthouse Score**: 90+ on Performance

## 🚢 Deployment

### Docker Compose (Recommended)

```bash
# Environment variables
cp packages/api/.env.example packages/api/.env
cp packages/web/.env.example packages/web/.env

# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Manual

```bash
# Backend
cd packages/api
npm run build
npm run start

# Frontend (serve dist/)
cd packages/web
npm run build
# Serve dist/ folder with nginx or static server
```

## 📚 Documentation

### Swagger UI
Interactive documentation available at `http://localhost:3000/api/docs`

### Skills (Project Patterns)
Check the `/skills` folder for specific patterns:
- `migestion.md`: Project overview
- `migestion-api.md`: Backend patterns
- `migestion-web.md`: Frontend patterns
- `migestion-prisma.md`: Prisma patterns
- And more...

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome:

1. Fork the repository
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New functionality
- `fix:` Bug fix
- `refactor:` Code improvement without functional change
- `test:` Add or update tests
- `docs:` Documentation changes
- `chore:` Maintenance tasks

## 📄 License

This project is under the MIT License. See `LICENSE` file for more details.

---

<div align="center">
  <sub>Developed with ❤️ by <a href="https://github.com/your-username">Eduard Barrera</a></sub>
  <br>
  <sub>Demonstrating enterprise architecture, clean code, and full-stack development best practices</sub>
</div>
