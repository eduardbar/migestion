#!/usr/bin/env node
/**
 * Production database migration script for Render deployment.
 * This script handles Prisma migrations for production environments.
 */

import 'dotenv/config';
import { execSync } from 'child_process';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set');
  process.exit(1);
}

try {
  console.log('🔄 Running Prisma migrations...');

  // Create a temporary .env file for Prisma CLI
  execSync('echo "DATABASE_URL=\\"' + DATABASE_URL + '\\"" > .env.migrations', {
    stdio: 'inherit',
  });

  // Run migrations using the temporary .env file
  execSync(
    'npx prisma migrate deploy --schema=./src/infrastructure/prisma/schema.prisma --env-file=.env.migrations',
    {
      stdio: 'inherit',
    }
  );

  console.log('✅ Migrations completed successfully');

  // Clean up
  execSync('rm -f .env.migrations', {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
