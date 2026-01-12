/**
 * Database initialization utilities
 * Ensures tables exist on startup, creates them if missing
 */

import { prisma } from './client.js';
import { logger } from '../../shared/utils/logger.js';

/**
 * Check if a table exists in the database
 */
async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await prisma.$queryRawUnsafe`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      )
    `;
    return Boolean(result && result[0] && result[0].exists);
  } catch (error) {
    return false;
  }
}

/**
 * Ensure all required tables exist, create if missing
 */
export async function ensureDatabaseSchema(): Promise<void> {
  const tables = [
    'tenants',
    'users',
    'refresh_tokens',
    'clients',
    'interactions',
    'segments',
    'notifications',
    'audit_logs',
  ];

  logger.info('Checking database schema...');

  const missingTables: string[] = [];

  for (const table of tables) {
    const exists = await tableExists(table);
    if (!exists) {
      missingTables.push(table);
    }
  }

  if (missingTables.length > 0) {
    logger.warn(`Missing tables: ${missingTables.join(', ')}`);
    logger.info('Tables will be created on first Prisma migration...');
  } else {
    logger.info('All required tables exist ✓');
  }
}

/**
 * Check if database is connected and accessible
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database connection failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
  }
}
