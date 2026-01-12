# Cómo configurar la base de datos en Render

## Problema RESUELTO ✅

Los tablas de Prisma no existían en la base de datos PostgreSQL de producción. Esto fue causado por:
1. Provider de Prisma era `mysql` pero la DB es PostgreSQL
2. Migraciones de MySQL existentes bloqueaban nuevas migraciones
3. Cliente Prisma generado tenía configuración de MySQL

**SOLUCIÓN APLICADA:**
- ✅ Schema actualizado a `provider = "postgresql"`
- ✅ Migraciones MySQL eliminadas
- ✅ Cliente Prisma regenerado con PostgreSQL
- ✅ Código push a GitHub (commit 6434121)

---

## Pasos finales en Render

### 1. Configura el Build Command

Ve a Render Dashboard → migestion-api → Settings → Build & Deploy

Usa **EXACTAMENTE** este comando:
```bash
npm install && npx prisma migrate deploy --schema=./packages/api/src/infrastructure/prisma/schema.prisma && cd packages/api && npm run build
```

### 2. Asegúrate de las variables de entorno

En Settings → Environment:
```
DATABASE_URL=postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db
JWT_ACCESS_SECRET=tu_secreto_de_32_caracteres_o_mas
JWT_REFRESH_SECRET=tu_secreto_de_32_caracteres_o_mas_diferente
WEB_URL=https://migestion-web.vercel.app
REDIS_URL=rediss://default:AY72AAIncDIwYjRhNjgwMjg4ZWM0YjM5OWU3NmY3Njg0ZmUxZGJmZXAyMzY1OTg@neutral-javelin-36598.upstash.io:6379
```

### 3. Forzar deploy manual

Ve a: **Manual Deploy** → **Deploy latest commit**

Esto forzará a Render a:
1. Usar el nuevo cliente Prisma con PostgreSQL
2. Ejecutar `prisma migrate deploy` (creará tablas desde cero)
3. Compilar el backend
4. Desplegar el servicio

---

## Usuario de prueba

Una vez el deploy termine, puedes probar con:
```
Email: test@migestion.com
Password: Test123!
```

## Verificar login

Prueba el login en:
https://migestion-web.vercel.app/login
