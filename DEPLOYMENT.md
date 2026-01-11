# Deployment Guide

## 🌐 Vercel (Frontend)

### 1. Conectar Repositorio a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio `eduardbar/migestion`
4. Vercel detectará automáticamente `packages/web`
5. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: `packages/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Haz clic en **Deploy**

### 2. Variables de Entorno
En Vercel, ve a **Settings > Environment Variables**:
```
VITE_API_URL=https://migestion-api.onrender.com
```

### 3. URL Resultante
- **Frontend**: `https://migestion.vercel.app`

---

## 🚀 Render (Backend)

### 1. Conectar Repositorio a Render
1. Ve a [render.com](https://render.com)
2. Haz clic en **"New +"**
3. Selecciona **Web Service**
4. Conecta tu repositorio `eduardbar/migestion`
5. Configura:
   - **Name**: `migestion-api`
   - **Root Directory**: `packages/api`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
6. Haz clic en **Create Web Service**

### 2. Variables de Entorno
En Render, ve a tu servicio > **Environment**:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=tu-mysql-url
JWT_SECRET=tu-jwt-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://migestion.vercel.app
REDIS_URL=tu-redis-url
```

### 3. Database Setup (Opcional)
Render ofrece databases gratuitas:
- **MySQL**: Crea una base de datos en Render
- **Redis**: Crea un Redis en Render
- Copia las URLs de conexión

### 4. URL Resultante
- **Backend**: `https://migestion-api.onrender.com`

---

## ✅ Verificación

1. Abre `https://migestion.vercel.app`
2. Intenta registrarte/iniciiar sesión
3. Verifica que el frontend conecta al backend

---

## 🔧 Troubleshooting

### Frontend no conecta al backend
- Verifica `VITE_API_URL` en Vercel
- Verifica `CORS_ORIGIN` en Render
- Re-depliega ambos servicios

### Backend falla en el build
- Asegúrate de que `DATABASE_URL` esté configurada
- Revisa las variables de entorno en Render

### 404 en el frontend
- Verifica que el output directory sea `dist`
- Revisa el build command en Vercel
