# Cómo configurar la base de datos en Render

## Problema actual

Las tablas de Prisma no existen en la base de datos PostgreSQL de producción, causando el error:

```
The table `public.users` does not exist in current database.
```

## Solución: Configurar Migrations en Render

### Opción 1: Script de build que ejecuta migraciones

1. **Ve a Render Dashboard** → migestion-api → Settings
2. **Añade estas variables de entorno:**

   ```
   DATABASE_URL=postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db
   JWT_ACCESS_SECRET=tu_secreto_de_32_caracteres_o_mas
   JWT_REFRESH_SECRET=tu_secreto_de_32_caracteres_o_mas_diferente
   WEB_URL=https://migestion-web.vercel.app
   REDIS_URL=rediss://default:AY72AAIncDIwYjRhNjgwMjg4ZWM0YjM5OWU3NmY3Njg0ZmUxZGJmZXAyMzY1OTg@neutral-javelin-36598.upstash.io:6379
   ```

3. **Configura el script de build (IMPORTANTE - usa esto):**

   Ve a: Settings → Build & Deploy
   - Cambia el **Build Command** EXACTAMENTE a:

   ```
   npm install && npx prisma migrate deploy --schema=./packages/api/src/infrastructure/prisma/schema.prisma && cd packages/api && npm run build
   ```

4. **Forzar deploy manual (CRÍTICO):**
   - Ve a: Manual Deploy → **Deploy latest commit**
   - ¡Esto forzará a Render a usar el código más reciente sin caché!

### Opción 2: Ejecutar migración manual desde terminal

1. **Conecta al servicio Render:**

   ```bash
   # Entra al dashboard de Render
   # migestion-api → Console (botón en esquina superior derecha)
   ```

2. **Ejecuta el comando de migración:**

   ```bash
   cd /opt/render/project/src/packages/api
   npm run db:migrate:prod
   ```

3. **Reinicia el servicio:**
   - Ve a Manual Deploy → Deploy latest commit

## Usuario de prueba para probar

Una vez las tablas estén creadas, puedes probar con:

- **Email:** test@migestion.com
- **Contraseña:** Test123!

## Verificar

Después de completar, prueba el login en:
https://migestion-web.vercel.app/login
