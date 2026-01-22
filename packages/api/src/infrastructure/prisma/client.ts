import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { isDevelopment } from '../../config/index.js';

/**
 * Prisma client singleton.
 * Ensures single database connection pool across the application.
 *
 * @remarks
 * - Logs queries in development for debugging
 * - Uses connection pooling for production performance
 * - Uses @prisma/adapter-pg for Prisma 7+ compatibility
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter,
    log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  });

if (isDevelopment) {
  globalForPrisma.prisma = prisma;
}

/**
 * Graceful shutdown handler for database connection.
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
