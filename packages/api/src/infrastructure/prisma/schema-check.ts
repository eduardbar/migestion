/**
 * Database initialization utilities
 * Ensures tables exist on startup, creates them if missing
 */

import { prisma } from './client.js';
import { logger } from '../../shared/utils/logger.js';

interface ExistsResult {
  exists: boolean;
}

interface QueryResult {
  rows: ExistsResult[];
}

/**
 * Check if a table exists in the database
 */
async function tableExists(tableName: string): Promise<boolean> {
  try {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `;
    const result = (await prisma.$queryRawUnsafe<QueryResult>(query, [tableName])) as QueryResult;
    const row = result.rows[0];
    return Boolean(row && typeof row.exists === 'boolean' && row.exists);
  } catch (error) {
    return false;
  }
}

/**
 * Create a table safely using raw SQL
 */
async function createTableSafely(createSql: string, tableName: string): Promise<void> {
  try {
    await prisma.$executeRawUnsafe(createSql);
    logger.info(`✓ Created table: ${tableName}`);
  } catch (error) {
    logger.error(`Failed to create table ${tableName}`, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

/**
 * Create index safely
 */
async function createIndexSafely(createSql: string): Promise<void> {
  try {
    await prisma.$executeRawUnsafe(createSql);
  } catch (error) {
    // Ignore errors for indexes/constraints that might already exist
    if (error instanceof Error && !error.message.includes('already exists')) {
      logger.warn(`Index creation warning: ${error.message}`);
    }
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

  if (missingTables.length === 0) {
    logger.info('All required tables exist ✓');
    return;
  }

  logger.warn(`Creating missing tables: ${missingTables.join(', ')}`);

  // Create tables in dependency order

  // 1. Tenants
  if (missingTables.includes('tenants')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "tenants" (
        "id" TEXT NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "slug" VARCHAR(50) NOT NULL,
        "status" VARCHAR(20) NOT NULL DEFAULT 'active',
        "settings" JSONB,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
      );
    `,
      'tenants'
    );

    await createIndexSafely(
      `CREATE UNIQUE INDEX IF NOT EXISTS "tenants_slug_key" ON "tenants"("slug");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "tenants_status_idx" ON "tenants"("status");`
    );
  }

  // 2. Users
  if (missingTables.includes('users')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "password_hash" VARCHAR(255) NOT NULL,
        "first_name" VARCHAR(100) NOT NULL,
        "last_name" VARCHAR(100) NOT NULL,
        "role" VARCHAR(20) NOT NULL DEFAULT 'user',
        "status" VARCHAR(20) NOT NULL DEFAULT 'active',
        "avatar_url" VARCHAR(500),
        "last_login_at" TIMESTAMP(3),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
      );
    `,
      'users'
    );

    await createIndexSafely(
      `CREATE UNIQUE INDEX IF NOT EXISTS "users_tenant_id_email_key" ON "users"("tenant_id", "email");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "users_tenant_id_status_idx" ON "users"("tenant_id", "status");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "users_tenant_id_role_idx" ON "users"("tenant_id", "role");`
    );

    await createIndexSafely(
      `ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
  }

  // 3. Refresh Tokens
  if (missingTables.includes('refresh_tokens')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "refresh_tokens" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "token_hash" VARCHAR(255) NOT NULL,
        "expires_at" TIMESTAMP(3) NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "revoked_at" TIMESTAMP(3),
        CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
      );
    `,
      'refresh_tokens'
    );

    await createIndexSafely(
      `CREATE UNIQUE INDEX IF NOT EXISTS "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");`
    );

    await createIndexSafely(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
  }

  // 4. Clients
  if (missingTables.includes('clients')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "clients" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "assigned_to_id" TEXT,
        "company_name" VARCHAR(200) NOT NULL,
        "contact_name" VARCHAR(200) NOT NULL,
        "email" VARCHAR(255),
        "phone" VARCHAR(20),
        "status" VARCHAR(20) NOT NULL DEFAULT 'prospect',
        "segment" VARCHAR(50),
        "tags" JSONB,
        "custom_fields" JSONB,
        "address" VARCHAR(500),
        "notes" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
      );
    `,
      'clients'
    );

    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_status_idx" ON "clients"("tenant_id", "status");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_segment_idx" ON "clients"("tenant_id", "segment");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_assigned_to_id_idx" ON "clients"("tenant_id", "assigned_to_id");`
    );

    await createIndexSafely(
      `ALTER TABLE "clients" ADD CONSTRAINT "clients_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
    await createIndexSafely(
      `ALTER TABLE "clients" ADD CONSTRAINT "clients_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`
    );
  }

  // 5. Interactions
  if (missingTables.includes('interactions')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "interactions" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "client_id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "notes" TEXT,
        "metadata" JSONB,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
      );
    `,
      'interactions'
    );

    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_client_id_idx" ON "interactions"("tenant_id", "client_id");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_user_id_idx" ON "interactions"("tenant_id", "user_id");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_created_at_idx" ON "interactions"("tenant_id", "created_at");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_type_idx" ON "interactions"("tenant_id", "type");`
    );

    await createIndexSafely(
      `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
    await createIndexSafely(
      `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
    await createIndexSafely(
      `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
  }

  // 6. Segments
  if (missingTables.includes('segments')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "segments" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "name" VARCHAR(100) NOT NULL,
        "criteria" JSONB,
        "color" VARCHAR(7),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "segments_pkey" PRIMARY KEY ("id")
      );
    `,
      'segments'
    );

    await createIndexSafely(
      `CREATE UNIQUE INDEX IF NOT EXISTS "segments_tenant_id_name_key" ON "segments"("tenant_id", "name");`
    );

    await createIndexSafely(
      `ALTER TABLE "segments" ADD CONSTRAINT "segments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
  }

  // 7. Notifications
  if (missingTables.includes('notifications')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "notifications" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "title" VARCHAR(200) NOT NULL,
        "message" TEXT,
        "data" JSONB,
        "read" BOOLEAN NOT NULL DEFAULT false,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
      );
    `,
      'notifications'
    );

    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "notifications_tenant_id_user_id_idx" ON "notifications"("tenant_id", "user_id");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "notifications_user_id_read_idx" ON "notifications"("user_id", "read");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");`
    );

    await createIndexSafely(
      `ALTER TABLE "notifications" ADD CONSTRAINT "notifications_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
    await createIndexSafely(
      `ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
  }

  // 8. Audit Logs
  if (missingTables.includes('audit_logs')) {
    await createTableSafely(
      `
      CREATE TABLE IF NOT EXISTS "audit_logs" (
        "id" TEXT NOT NULL,
        "tenant_id" TEXT NOT NULL,
        "user_id" TEXT,
        "action" VARCHAR(50) NOT NULL,
        "entity" VARCHAR(50) NOT NULL,
        "entity_id" VARCHAR(36),
        "old_values" JSONB,
        "new_values" JSONB,
        "ip_address" VARCHAR(45),
        "user_agent" VARCHAR(500),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
      );
    `,
      'audit_logs'
    );

    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_created_at_idx" ON "audit_logs"("tenant_id", "created_at");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_entity_idx" ON "audit_logs"("tenant_id", "entity");`
    );
    await createIndexSafely(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_user_id_idx" ON "audit_logs"("tenant_id", "user_id");`
    );

    await createIndexSafely(
      `ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
    );
    await createIndexSafely(
      `ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`
    );
  }

  logger.info('All missing tables created successfully ✓');
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
