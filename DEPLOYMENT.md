# Deployment Guide - Fly.io + Vercel

## 🎯 Arquitectura Final

```
┌──────────────────────────────┐
│    Vercel (Frontend)      │
│  migestion.vercel.app      │
└───────────┬──────────────────┘
            │ HTTPS
            ▼
┌──────────────────────────────┐
│    Fly.io (Backend)        │
│  migestion-api.fly.dev    │
└─────────┬───────┬──────────┘
          │       │
          ▼       ▼
   ┌──────────┴──────────┐
   │  PostgreSQL (Fly)   │
   │  migestion-db.fly.dev │
   └─────────────────────┘
```

---

## 🚀 Parte 1: Deploy Backend + Database (Fly.io)

### Paso 1: Instalar Fly.io CLI

**Windows:**
```powershell
iwr https://fly.io/install.ps1 | iex
```

**Mac/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**O con winget:**
```bash
winget install superfly.flyctl
```

### Paso 2: Login en Fly.io

```bash
flyctl auth login
```

### Paso 3: Crear App Backend

```bash
# Ve al directorio raíz del proyecto
cd migestion

# Crea la app en Fly.io (automático)
flyctl launch --regions iad

# Responde a las preguntas:
# - Create app? → Yes
# - App name → migestion-api
# - Region → iad (IAD - Frankfurt) o la más cercana
# - Set up database? → No (lo haremos manualmente)
```

### Paso 4: Crear Base de Datos PostgreSQL

```bash
# Crear PostgreSQL database en Fly.io
flyctl postgres create --name migestion-db --region iad

# NOTA: Fly.io ofrece PostgreSQL gratuito (más estable que MySQL)
# PostgreSQL es 100% compatible con Prisma
```

### Paso 5: Crear Redis (Opcional)

```bash
# Crear Redis en Fly.io
flyctl redis create --name migestion-redis --region iad
```

### Paso 6: Obtener URLs de Conexón

Después de crear PostgreSQL y Redis, Fly.io mostrará las URLs:

```
PostgreSQL:
  PostgresQL database: postgresql://migestion:PASSWORD@xxx.fly.dev:5432/migestion

Redis:
  Redis URL: rediss://default:PASSWORD@xxx.fly.dev:6379
```

**Guarda estas URLs**, las usarás en el paso 8.

### Paso 7: Configurar Variables de Entorno

Ve a tu dashboard de Fly.io: https://fly.io/dashboard

1. Selecciona **migestion-api**
2. Ve a **Settings > Environment Variables**
3. Agrega o edita las siguientes variables:

```
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu-secret-jwt-único-y-seguro
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://migestion.vercel.app
REDIS_URL=rediss://usuario:password@host:6379
```

4. Haz clic en **Save Changes**

### Paso 8: Deploy Backend en Fly.io

```bash
# Deploy inicial
flyctl deploy

# Esto compilará y desplegará:
# - npm install
# - Generará Prisma client
# - Ejecutará migraciones (prisma migrate deploy)
# - Compilará TypeScript
# - Iniciará el servidor
```

### Paso 9: Verificar Despliegue

1. Ve a: https://fly.io/dashboard
2. Busca **migestion-api**
3. Verifica que el estado sea **"Running"** ✅
4. Haz clic en **"Monitoring"** para ver los logs
5. No debería haber errores

### Paso 10: Probar Backend

```bash
# Test health endpoint
curl https://migestion-api.fly.dev/health

# Debería responder:
# {"status":"ok","timestamp":"...","uptime":...}
```

---

## 🌐 Parte 2: Deploy Frontend (Vercel)

### Paso 1: Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. O usa tu cuenta de GitHub (es más rápido)

### Paso 2: Conectar Repositorio

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio `eduardbar/migestion`
3. Vercel detectará automáticamente `packages/web`

### Paso 3: Configurar Proyecto

Configura así:

```
Framework Preset: Vite
Root Directory: packages/web
Build Command: npm run build
Output Directory: dist
```

4. Haz clic en **"Deploy"**

### Paso 4: Configurar Variables de Entorno

En Vercel, ve a **Settings > Environment Variables**:

```
VITE_API_URL=https://migestion-api.fly.dev
```

5. Haz clic en **Save** y re-deploy automáticamente

### Paso 5: Verificar Frontend

1. Ve a: https://migestion.vercel.app
2. Intenta registrar una cuenta nueva
3. Verifica que conecte al backend de Fly.io

---

## ✅ Checklist de Despliegue Completo

- [ ] Cuenta creada en Fly.io
- [ ] App backend creada en Fly.io
- [ ] PostgreSQL database creada en Fly.io
- [ ] Redis creado en Fly.io (opcional)
- [ ] Variables de entorno configuradas en Fly.io
- [ ] Backend desplegado exitosamente
- [ ] Backend en estado "Running" ✅
- [ ] Cuenta creada en Vercel
- [ ] Frontend desplegado en Vercel
- [ ] VITE_API_URL configurada en Vercel
- [ ] Frontend conecta al backend
- [ ] Login/Registro funciona

---

## 🔧 Variables de Entorno Finales

### Backend (Fly.io)

```
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://usuario:PASSWORD@xxx.fly.dev:5432/migestion
JWT_SECRET=tu-secret-jwt-único-y-seguro
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://migestion.vercel.app
REDIS_URL=rediss://usuario:PASSWORD@xxx.fly.dev:6379
```

### Frontend (Vercel)

```
VITE_API_URL=https://migestion-api.fly.dev
```

---

## 🌐 URLs Finales

| Servicio | URL |
|----------|-----|
| **Frontend** | `https://migestion.vercel.app` |
| **Backend API** | `https://migestion-api.fly.dev` |
| **PostgreSQL** | `xxx.fly.dev:5432` |
| **Redis** | `xxx.fly.dev:6379` |

---

## 🔧 Troubleshooting

### Backend falla en Fly.io

**Error: `PrismaClientInitializationError`**
- Verifica que `DATABASE_URL` sea correcta
- Verifica que la base de datos PostgreSQL esté creada

**Error: `Connection refused`**
- Verifica que el puerto sea `8080` en Fly.io
- Revisa los logs en Fly.io Dashboard

### Frontend no conecta al backend

**Error: `CORS` o conexión fallida**
- Verifica `CORS_ORIGIN` en Fly.io
- Verifica `VITE_API_URL` en Vercel
- Re-depliega ambos servicios

### Migraciones no se ejecutan

**Solución:**
```bash
# Ejecutar migraciones manualmente
flyctl ssh console -a migestion-api
cd packages/api
npx prisma migrate deploy
```

### Tests fallan en producción

**Verifica:**
- Variables de entorno estén configuradas
- Base de datos tenga datos
- Redis esté funcionando (si usado)

---

## 📝 Comandos Útiles

```bash
# Ver logs en tiempo real
flyctl logs -a migestion-api

# Ver estado del deployment
flyctl status -a migestion-api

# Re-deploy (si hay cambios)
flyctl deploy -a migestion-api

# SSH al servidor
flyctl ssh console -a migestion-api

# Ver detalles de la app
flyctl info -a migestion-api
```

---

## 💰 Costos (Free Tier)

| Servicio | Costo Mensual | Límites Free Tier |
|----------|---------------|------------------|
| **Fly.io Backend** | $0 | 256MB RAM, 1 CPU |
| **Fly.io PostgreSQL** | $0 | 1GB storage |
| **Fly.io Redis** | $0 | 256MB RAM |
| **Vercel Frontend** | $0 | 100GB bandwidth |

**Total:** $0/mes (todo en free tier)

---

## ⚠️ Importante

1. **DATABASE_URL debe ser la EXACTA de Fly.io** - No la edites manualmente
2. **JWT_SECRET debe ser única y segura** - Usa un generador de contraseñas
3. **CORS_ORIGIN debe coincidir** - `https://migestion.vercel.app`
4. **Migraciones se ejecutan automáticamente** con `prisma migrate deploy`
5. **El primer build tarda más** - 5-10 minutos por migraciones
6. **Fly.io usa PostgreSQL, no MySQL** - Pero es 100% compatible con Prisma

---

## 🎯 Recursos Adicionales

- [Fly.io Documentation](https://fly.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deploy Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-fly-io)
- [Fly.io Pricing](https://fly.io/docs/about/pricing)
