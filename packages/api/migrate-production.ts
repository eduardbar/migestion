import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://migestion_db_user:JMmjEKBGGx80rZLgcAOoqzewBKHZvkcF@dpg-d5igf8fgi27c73br3l40-a/migestion_db',
    },
  },
});

async function main() {
  console.log('\n🔨 Creating database schema in production...\n');
  
  try {
    // Push schema to database
    await prisma.$connect();
    console.log('✓ Connected to database');
    
    // Create all tables
    const { _count } = await prisma.$executeRawUnsafe`
      SELECT COUNT(*) as _count FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log(`✓ Found ${_count} existing tables`);
    
    console.log('\n⚠️  Run this command to create tables:');
    console.log('npx prisma db push');
    console.log('\nOr run migrations:');
    console.log('npx prisma migrate deploy\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
