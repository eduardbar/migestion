/**
 * Script de inicialización para producción en Render
 * Asegura que Prisma genere el cliente antes de las migraciones
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('\n🔨 Setting up production database...\n');

// 1. Generar cliente Prisma primero
console.log('📦 Generating Prisma client...');
try {
  execSync('npx prisma generate --schema=./src/infrastructure/prisma/schema.prisma', {
    stdio: 'inherit',
    cwd: path.join(__dirname, 'packages/api'),
  });
  console.log('✓ Prisma client generated\n');
} catch (error) {
  console.error('✗ Failed to generate Prisma client:', error.message);
  process.exit(1);
}

// 2. Crear las tablas con db push
console.log('📊 Pushing schema to database...');
try {
  execSync('npx prisma db push --schema=./src/infrastructure/prisma/schema.prisma', {
    stdio: 'inherit',
    cwd: path.join(__dirname, 'packages/api'),
  });
  console.log('✓ Schema pushed to database\n');
} catch (error) {
  console.error('✗ Failed to push schema:', error.message);
  process.exit(1);
}

// 3. Compilar el backend
console.log('🔨 Building backend...');
try {
  execSync('npm run build:api', {
    stdio: 'inherit',
    cwd: path.join(__dirname, 'packages/api'),
  });
  console.log('✓ Backend built\n');
} catch (error) {
  console.error('✗ Failed to build:', error.message);
  process.exit(1);
}

console.log('\n✅ All done! Database tables created and backend built.\n');
