# 📊 MiGestion: CRM SaaS Multi-Tenant de Nivel Empresarial

![MiGestion Preview](packages/web/public/og-image.png)

**MiGestion** es una plataforma CRM (Customer Relationship Management) de nivel empresarial, diseñada para negocios locales que buscan profesionalizar la gestión de sus clientes. Con arquitectura multi-tenant, autenticación segura y análisis en tiempo real, MiGestion ofrece todas las herramientas necesarias para convertir datos de clientes en decisiones estratégicas.

## 🚀 Características Principales

- 🏢 **Multi-Tenant**: Aislamiento completo de datos por inquilino. Cada empresa opera en su propio espacio seguro.
- 🔐 **Autenticación JWT**: Sistema de tokens con refresh automático, rotación y revocación para máxima seguridad.
- 👥 **Control de Acceso por Roles**: 4 roles jerárquicos (Owner, Admin, Manager, User) con permisos granulares.
- 📇 **Gestión de Clientes**: CRUD completo con búsqueda avanzada, filtros dinámicos, paginación y operaciones masivas.
- 📞 **Seguimiento de Interacciones**: Registra llamadas, emails, reuniones, notas y tareas vinculadas a clientes.
- 🎯 **Segmentación de Clientes**: Organiza clientes con segmentos personalizados y criterios dinámicos.
- 📊 **Reportes Avanzados**: Dashboard con KPIs en tiempo real, gráficos interactivos y análisis de tendencias.
- 🔔 **Notificaciones en Tiempo Real**: Integración con Socket.IO para actualizaciones instantáneas.
- 📋 **Auditoría Completa**: Registro detallado de todas las operaciones con redacción de campos sensibles.

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 18, TypeScript 5, Vite 5, TailwindCSS, Zustand 4, TanStack Query 5 |
| **Backend** | Node.js 20, Express 4, TypeScript 5, Prisma ORM |
| **Base de Datos** | MySQL 8, Redis 7 |
| **Testing** | Jest (114 tests), Playwright (44 E2E tests) |
| **Real-time** | Socket.IO 4 |
| **Infraestructura** | Docker, Docker Compose, GitHub Actions |
| **Documentación** | OpenAPI 3.0, Swagger UI |

## ⚙️ Configuración del Entorno

### Backend (`packages/api/.env`)

```env
# Base de datos
DATABASE_URL="mysql://user:password@localhost:3306/migestion"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="tu_secreto_ultra_seguro_cambiame"
JWT_REFRESH_SECRET="otro_secreto_diferente"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Aplicación
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

## 📦 Instalación y Despliegue

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/migestion.git
cd migestion
```

### 2. Instalar dependencias

Instala todas las dependencias del monorepo:

```bash
npm install
```

Esto instalará automáticamente las dependencias de ambos paquetes (`api` y `web`).

### 3. Configurar la base de datos

Inicia la infraestructura (MySQL y Redis) con Docker:

```bash
docker-compose up -d
```

Genera el cliente de Prisma y ejecuta las migraciones:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Desarrollo Local

Para correr ambos servidores simultáneamente:

```bash
npm run dev
```

O de forma individual:

**Terminal 1 - Backend:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev:web
```

**URLs disponibles:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
- Swagger Docs: `http://localhost:3000/api/docs`
- Socket.IO: `http://localhost:3000`

### 5. Construcción para Producción

```bash
# Build completo (API + Web)
npm run build

# Build individual
npm run build:api
npm run build:web
```

## 📂 Estructura del Proyecto

```
migestion/
├── packages/
│   ├── api/                     # Backend Node.js + Express
│   │   ├── src/
│   │   │   ├── config/          # Configuración y constantes
│   │   │   ├── infrastructure/  # Prisma, Redis, Socket.IO
│   │   │   ├── modules/         # Lógica de negocio modularizada
│   │   │   │   ├── auth/        # Autenticación y autorización
│   │   │   │   ├── tenants/     # Gestión multi-tenant
│   │   │   │   ├── users/       # Usuarios y roles
│   │   │   │   ├── clients/     # CRUD de clientes
│   │   │   │   ├── interactions/ # Interacciones con clientes
│   │   │   │   ├── segments/    # Segmentación
│   │   │   │   ├── reports/     # Reportes y analytics
│   │   │   │   └── notifications/ # Sistema de notificaciones
│   │   │   └── shared/          # Middlewares, utils, errores
│   │   ├── prisma/              # Schema y migraciones
│   │   ├── tests/               # Tests unitarios (Jest)
│   │   └── .env.example
│   │
│   └── web/                     # Frontend React + Vite
│       ├── src/
│       │   ├── components/      # Componentes UI reutilizables
│       │   │   ├── ui/          # Componentes base (Button, Input, etc.)
│       │   │   ├── features/    # Componentes de features
│       │   │   └── notifications/ # Sistema de notificaciones
│       │   ├── pages/           # Páginas de la aplicación
│       │   │   ├── auth/        # Login, Register
│       │   │   ├── dashboard/   # Dashboard principal
│       │   │   ├── clients/     # Gestión de clientes
│       │   │   ├── interactions/ # Interacciones
│       │   │   ├── reports/     # Reportes
│       │   │   └── settings/    # Configuración
│       │   ├── stores/          # Estado global (Zustand)
│       │   ├── services/        # Clientes API
│       │   ├── hooks/           # Custom hooks
│       │   ├── contexts/        # React contexts
│       │   └── lib/             # Utilidades y constantes
│       ├── e2e/                 # Tests E2E (Playwright)
│       ├── public/              # Assets estáticos
│       └── .env.example
│
├── docker/                      # Dockerfiles
├── .github/workflows/           # CI/CD pipelines
├── docker-compose.yml           # Orquestación local
└── skills/                      # Documentación de patrones
```

## 📡 API Endpoints

### Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/register` | Registrar nuevo tenant y usuario owner | No |
| `POST` | `/login` | Iniciar sesión (retorna access + refresh token) | No |
| `POST` | `/refresh` | Renovar access token con refresh token | No |
| `POST` | `/logout` | Cerrar sesión y revocar tokens | Sí |
| `GET` | `/me` | Obtener usuario autenticado | Sí |

### Clientes (`/api/clients`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `POST` | `/` | Crear nuevo cliente | User |
| `GET` | `/` | Listar clientes con filtros y paginación | User |
| `GET` | `/:id` | Obtener detalles de un cliente | User |
| `PUT` | `/:id` | Actualizar cliente | User |
| `DELETE` | `/:id` | Eliminar cliente (soft delete) | Manager |
| `POST` | `/bulk` | Operación masiva (actualizar/eliminar) | Manager |

### Interacciones (`/api/interactions`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `POST` | `/` | Registrar nueva interacción | User |
| `GET` | `/` | Listar interacciones (filtros por cliente, tipo, fecha) | User |
| `GET` | `/:id` | Obtener detalles de interacción | User |
| `PUT` | `/:id` | Actualizar interacción | User |
| `DELETE` | `/:id` | Eliminar interacción | Manager |

### Segmentos (`/api/segments`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `POST` | `/` | Crear segmento personalizado | Manager |
| `GET` | `/` | Listar segmentos del tenant | User |
| `GET` | `/:id/clients` | Obtener clientes del segmento | User |
| `PUT` | `/:id` | Actualizar criterios del segmento | Manager |
| `DELETE` | `/:id` | Eliminar segmento | Manager |

### Reportes (`/api/reports`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `GET` | `/dashboard` | KPIs del dashboard principal | User |
| `GET` | `/clients-by-status` | Distribución de clientes por estado | User |
| `GET` | `/interactions-timeline` | Timeline de interacciones | User |
| `GET` | `/user-performance` | Rendimiento por usuario | Manager |

### Notificaciones (`/api/notifications`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `GET` | `/` | Listar notificaciones del usuario | User |
| `PUT` | `/:id/read` | Marcar como leída | User |
| `PUT` | `/read-all` | Marcar todas como leídas | User |

### Auditoría (`/api/audit`)
| Método | Endpoint | Descripción | Rol Mínimo |
|--------|----------|-------------|------------|
| `GET` | `/` | Listar logs de auditoría | Admin |
| `GET` | `/export` | Exportar logs (CSV/JSON) | Owner |

## 🧪 Testing

### Tests Unitarios (Backend)

```bash
# Ejecutar todos los tests
npm run test:api

# Tests en modo watch
npm run test:api -- --watch

# Tests con cobertura
npm run test:api -- --coverage
```

**Cobertura actual:** 114 tests, >80% en rutas críticas

### Tests E2E (Frontend)

```bash
# Ejecutar tests E2E
npm run test:e2e

# Modo interactivo
npm run test:e2e:ui

# Tests específicos
npm run test:e2e -- auth.spec.ts
```

**Suite completa:** 44 tests cubriendo:
- Autenticación (register, login, logout)
- Navegación completa
- CRUD de clientes
- Interacciones
- Dashboard y reportes

### Tests de Componentes (Frontend)

```bash
npm run test:web
```

## 🏗️ Arquitectura

MiGestion implementa **Clean Architecture** con separación clara de responsabilidades:

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

### Patrones de Diseño Implementados

- ✅ **Repository Pattern**: Abstracción de acceso a datos
- ✅ **Service Layer**: Lógica de negocio desacoplada
- ✅ **DTO Pattern**: Transferencia de datos tipada
- ✅ **Middleware Pattern**: Concerns transversales (auth, audit, RBAC)
- ✅ **Factory Pattern**: Creación de errores y respuestas
- ✅ **Singleton Pattern**: Prisma client, Redis connection
- ✅ **Observer Pattern**: Sistema de eventos con Socket.IO
- ✅ **Dependency Injection**: Inyección de repositorios en servicios

### Principios SOLID

- **S**ingle Responsibility: Cada módulo tiene una responsabilidad clara
- **O**pen/Closed: Extensible sin modificar código existente
- **L**iskov Substitution: Interfaces consistentes y reemplazables
- **I**nterface Segregation: Interfaces específicas y mínimas
- **D**ependency Inversion: Dependencias hacia abstracciones

## 🎨 Sistema de Diseño

**Estética Profesional Minimalista**

### Paleta de Colores
- **Neutral**: Escala de grises (50-950) para UI base
- **Primary**: Azul profesional (#2563EB) para acciones principales
- **Success**: Verde (#22C55E) para estados positivos
- **Warning**: Amarillo (#EAB308) para alertas
- **Error**: Rojo (#EF4444) para errores

### Tipografía
- **Familia**: Inter (Google Fonts)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Escalas**: xs (0.75rem) → 3xl (2rem)

### Componentes
- Diseño basado en bordes (no sombras pesadas)
- Border radius consistente (6px)
- Espaciado en múltiplos de 4px
- Transiciones suaves (150ms)
- Responsive first con breakpoints Tailwind

### Gráficos
- Recharts para visualizaciones
- Colores neutros con acentos azules
- Tooltips interactivos
- Responsive y accesible

## 🔐 Seguridad

| Categoría | Implementación |
|-----------|----------------|
| **Autenticación** | JWT con access (15min) y refresh tokens (7d) |
| **Passwords** | bcrypt con 10 salt rounds, validación de complejidad |
| **Autorización** | RBAC jerárquico con 4 roles y permisos granulares |
| **Multi-tenant** | Aislamiento por `tenantId` en todas las queries |
| **Validación** | Zod schemas en todos los endpoints |
| **Rate Limiting** | Límites configurables por ruta |
| **Auditoría** | Logs completos con redacción de campos sensibles |
| **Headers** | Helmet.js para headers HTTP seguros |
| **CORS** | Configuración estricta por entorno |

## 📈 Performance

### Optimizaciones Implementadas

- **Code Splitting**: Lazy loading de páginas React
- **Vendor Chunks**: Separación de librerías (React, Charts)
- **Redis Caching**: Cache de notificaciones y sesiones
- **Database Indexing**: Índices en columnas frecuentes
- **Pagination**: Cursor-based para datasets grandes
- **Query Optimization**: Selección de campos necesarios
- **Connection Pooling**: Prisma con pool de conexiones
- **Compression**: Gzip en respuestas HTTP

### Métricas

- **Build Size**: ~600KB (gzipped)
- **First Load**: <2s con cache
- **API Response**: <100ms (queries simples)
- **Lighthouse Score**: 90+ en Performance

## 🚢 Deployment

### Docker Compose (Recomendado)

```bash
# Variables de entorno
cp packages/api/.env.example packages/api/.env
cp packages/web/.env.example packages/web/.env

# Build y start
docker-compose up --build -d

# Ver logs
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

# Frontend (servir dist/)
cd packages/web
npm run build
# Servir carpeta dist/ con nginx o servidor estático
```

## 📚 Documentación

### Swagger UI
Documentación interactiva disponible en `http://localhost:3000/api/docs`

### Skills (Patrones del Proyecto)
Consulta la carpeta `/skills` para patrones específicos:
- `migestion.md`: Overview del proyecto
- `migestion-api.md`: Patrones del backend
- `migestion-web.md`: Patrones del frontend
- `migestion-prisma.md`: Patrones de Prisma
- Y más...

## 🤝 Contribuir

Este es un proyecto de portfolio, pero las sugerencias son bienvenidas:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `refactor:` Mejora de código sin cambio funcional
- `test:` Añadir o actualizar tests
- `docs:` Cambios en documentación
- `chore:` Tareas de mantenimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

<div align="center">
  <sub>Desarrollado con ❤️ por <a href="https://github.com/tu-usuario">Eduard Barrera</a></sub>
  <br>
  <sub>Demostrando arquitectura empresarial, clean code y mejores prácticas de desarrollo full-stack</sub>
</div>
