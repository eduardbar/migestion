import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function createTestUser() {
  console.log('\n🌱 Creating test user for production...\n');
  
  try {
    const passwordHash = await hashPassword('Test123!');
    
    const tenant = await prisma.tenant.upsert({
      where: { slug: 'migestion-test' },
      update: {},
      create: {
        name: 'MiGestion Test',
        slug: 'migestion-test',
        status: 'active',
        settings: {
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
        },
      },
    });

    console.log(`✓ Tenant created: ${tenant.name} (${tenant.id})`);

    const user = await prisma.user.upsert({
      where: {
        tenantId_email: {
          tenantId: tenant.id,
          email: 'test@migestion.com',
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'test@migestion.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'owner',
        status: 'active',
        passwordHash,
      },
    });

    console.log(`✓ User created: ${user.email} (${user.id})`);
    
    console.log('\n✅ Test user created successfully!\n');
    console.log('📧 Email: test@migestion.com');
    console.log('🔑 Password: Test123!\n');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
