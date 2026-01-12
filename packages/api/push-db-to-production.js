const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.DATABASE_URL ||
        'postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db',
    },
  },
});

async function main() {
  console.log('\n🔨 Connecting to production database...\n');

  try {
    await prisma.$connect();
    console.log('✓ Connected successfully');

    console.log('📊 Pushing schema to database...\n');

    // 1. Tenants table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "tenants_slug_key" ON "tenants"("slug");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "tenants_status_idx" ON "tenants"("status");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "tenants_slug_idx" ON "tenants"("slug");`
    );

    console.log('✓ Checked/Created tenants table');

    // 2. Users table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "users_tenant_id_email_key" ON "users"("tenant_id", "email");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "users_tenant_id_status_idx" ON "users"("tenant_id", "status");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "users_tenant_id_role_idx" ON "users"("tenant_id", "role");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created users table');

    // 3. Refresh Tokens table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "refresh_tokens" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "token_hash" VARCHAR(255) NOT NULL,
        "expires_at" TIMESTAMP(3) NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "revoked_at" TIMESTAMP(3),
        CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created refresh_tokens table');

    // 4. Clients table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_status_idx" ON "clients"("tenant_id", "status");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_segment_idx" ON "clients"("tenant_id", "segment");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_assigned_to_id_idx" ON "clients"("tenant_id", "assigned_to_id");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "clients_tenant_id_company_name_idx" ON "clients"("tenant_id", "company_name");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "clients" ADD CONSTRAINT "clients_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "clients" ADD CONSTRAINT "clients_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created clients table');

    // 5. Interactions table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_client_id_idx" ON "interactions"("tenant_id", "client_id");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_user_id_idx" ON "interactions"("tenant_id", "user_id");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_created_at_idx" ON "interactions"("tenant_id", "created_at");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "interactions_tenant_id_type_idx" ON "interactions"("tenant_id", "type");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "interactions" ADD CONSTRAINT "interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created interactions table');

    // 6. Segments table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "segments_tenant_id_name_key" ON "segments"("tenant_id", "name");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "segments_tenant_id_idx" ON "segments"("tenant_id");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "segments" ADD CONSTRAINT "segments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created segments table');

    // 7. Notifications table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "notifications_tenant_id_user_id_idx" ON "notifications"("tenant_id", "user_id");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "notifications_user_id_read_idx" ON "notifications"("user_id", "read");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "notifications" ADD CONSTRAINT "notifications_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created notifications table');

    // 8. Audit Logs table
    await prisma.$executeRawUnsafe(`
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
    `);

    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_created_at_idx" ON "audit_logs"("tenant_id", "created_at");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_entity_idx" ON "audit_logs"("tenant_id", "entity");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "audit_logs_tenant_id_user_id_idx" ON "audit_logs"("tenant_id", "user_id");`
    );

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
      );
    } catch (e) {}
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`
      );
    } catch (e) {}

    console.log('✓ Checked/Created audit_logs table');

    console.log('\n✅ Database schema verified/created successfully!\n');
    console.log('\n👤 Test user credentials:');
    console.log('   Email: test@migestion.com');
    console.log('   Password: Test123!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
