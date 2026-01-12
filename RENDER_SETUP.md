# Cómo configurar la base de datos en Render

## Problema RESUELTO ✅

Los tablas de Prisma no existían en la base de datos PostgreSQL de producción. Esto fue causado por:

1. ✅ Provider de Prisma era `mysql` pero la DB es PostgreSQL - **RESUELTO**
2. ✅ Migraciones de MySQL bloqueaban nuevas migraciones - **RESUELTO**
3. ✅ Cliente Prisma generado tenía configuración de MySQL - **RESUELTO**
4. ✅ Código con cliente Prisma regenerado push a GitHub (commit 6434121) - **RESUELTO**

---

## SOLUCIÓN FINAL - Script de Inicialización

### 1. Cambiar el tipo de servicio a Web Service (RECOMENDADO)

Si no puedes acceder a la Console, cambia el tipo de servicio:

Ve a Render Dashboard → `migestion-api` → **Settings**

Busca: **"Instance Type"** o **"Service Type"**
Cámbialo de **"Private Service"** a **"Web Service"**

Esto habilitará la **Console** y permitirá ejecutar comandos directamente.

---

### 2. Configura las variables de entorno

En **Settings → Environment**:

```
DATABASE_URL=postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db
JWT_ACCESS_SECRET=tu_secreto_de_32_caracteres_o_mas
JWT_REFRESH_SECRET=tu_secreto_de_32_caracteres_o_mas_diferente
WEB_URL=https://migestion-web.vercel.app
REDIS_URL=rediss://default:AY72AAIncDIwYjRhNjgwMjg4ZWM0YjM5OWU3NmY3Njg0ZmUxZGJmZXAyMzY1OTg@neutral-javelin-36598.upstash.io:6379
```

**IMPORTANTE:** Guarda los cambios clicando en **"Save Changes"**.

---

### 3. Usa el nuevo Build Command

Ve a **Settings → Build & Deploy**

Usa este comando (usa el script de inicialización):

```bash
npm install && npm run setup-prod-db
```

**Alternativa si lo anterior falla:**

```bash
npm install && npx prisma generate --schema=./packages/api/src/infrastructure/prisma/schema.prisma && npx prisma db push --schema=./packages/api/src/infrastructure/prisma/schema.prisma && cd packages/api && npm run build
```

---

### 4. Forzar el deploy manual

Ve a: **Manual Deploy** → **Deploy latest commit**

---

## Usuario de prueba

Una vez el build termine, puedes probar con:

```
Email: test@migestion.com
Password: Test123!
```

## Verificar login

Prueba el login en:
https://migestion-web.vercel.app/login
