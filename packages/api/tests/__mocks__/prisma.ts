/**
 * Mock for Prisma client.
 * Used in unit tests to avoid database connections.
 */

import type { PrismaClient } from '@prisma/client';

// Simple mock type without jest-mock-extended dependency
type MockPrismaClient = {
  [K in keyof PrismaClient]: Record<string, jest.Mock>;
} & {
  $transaction: jest.Mock;
};

export const prisma: MockPrismaClient = {
  tenant: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  $transaction: jest.fn((fn: unknown) => (fn as (tx: unknown) => Promise<unknown>)(prisma)),
} as unknown as MockPrismaClient;
