const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db',
    },
  },
});

async function main() {
  console.log('\n🔨 Connecting to production database...\n');
  
  try {
    await prisma.$connect();
    console.log('✓ Connected successfully');
    
    console.log('📊 Pushing schema to database...\n');
    
    // Create tables using Prisma Client
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS tenants (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'active',
        settings JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    
    console.log('✓ Created tenants table');
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id TEXT NOT NULL,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        status TEXT NOT NULL DEFAULT 'active',
        avatar_url TEXT,
        last_login_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        UNIQUE(tenant_id, email)
      );
    `);
    
    console.log('✓ Created users table');
    
    // Create refresh_tokens table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        revoked_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    
    console.log('✓ Created refresh_tokens table');
    
    console.log('\n✅ Database schema created successfully!\n');
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
  process.exit(1);
});
