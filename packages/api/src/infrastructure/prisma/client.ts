import { PrismaClient } from '@prisma/client';
import { env, isDevelopment } from '../../config/index.js';

/**
 * Prisma client singleton.
 * Ensures single database connection pool across the application.
 * 
 * @remarks
 * - Logs queries in development for debugging
 * - Uses connection pooling for production performance
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
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
