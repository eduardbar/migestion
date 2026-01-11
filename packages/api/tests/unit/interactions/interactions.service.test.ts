// Mock Prisma client BEFORE importing interaction modules
jest.mock('@/infrastructure/prisma/client', () => ({
  prisma: {
    interaction: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    client: {
      findFirst: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: unknown) => Promise<unknown>) => fn({
      interaction: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  },
}));

import * as interactionsService from '@/modules/interactions/interactions.service';
import * as interactionsRepository from '@/modules/interactions/interactions.repository';
import { AppError } from '@/shared/errors';

// Mock the repository
jest.mock('@/modules/interactions/interactions.repository');

const mockInteractionsRepository = interactionsRepository as jest.Mocked<typeof interactionsRepository>;

/**
 * Helper to verify AppError with specific code
 */
async function expectAppError(
  promise: Promise<unknown>,
  expectedCode: string
): Promise<void> {
  try {
    await promise;
    fail('Should have thrown an error');
  } catch (error) {
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).code).toBe(expectedCode);
  }
}

/**
 * Unit tests for interactions service.
 */
describe('InteractionsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tenantId = 'tenant-123';
  const userId = 'user-789';

  const mockUser = {
    id: 'user-789',
    tenantId,
    email: 'sales@company.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'manager',
    status: 'active',
    avatarUrl: null,
    passwordHash: 'hash',
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockClient = {
    id: 'client-456',
    tenantId,
    companyName: 'Acme Corp',
    contactName: 'John Doe',
    email: 'john@acme.com',
    phone: '+1234567890',
    status: 'active',
    segment: 'enterprise',
    tags: null,
    customFields: null,
    address: null,
    notes: null,
    assignedToId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockInteraction = {
    id: 'interaction-001',
    tenantId,
    clientId: 'client-456',
    userId: 'user-789',
    type: 'call',
    notes: 'Discussed pricing options',
    metadata: { duration: 30, outcome: 'positive' },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockInteractionWithRelations = {
    ...mockInteraction,
    user: mockUser,
    client: mockClient,
  };

  describe('getById', () => {
    it('should return interaction with relations', async () => {
      mockInteractionsRepository.findById.mockResolvedValue(mockInteractionWithRelations);

      const result = await interactionsService.getById(tenantId, 'interaction-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('interaction-001');
      expect(result.type).toBe('call');
      expect(result.user.firstName).toBe('Jane');
      expect(result.client.companyName).toBe('Acme Corp');
      expect(mockInteractionsRepository.findById).toHaveBeenCalledWith(tenantId, 'interaction-001');
    });

    it('should throw NOT_FOUND if interaction does not exist', async () => {
      mockInteractionsRepository.findById.mockResolvedValue(null);

      await expectAppError(
        interactionsService.getById(tenantId, 'non-existent'),
        'NOT_FOUND'
      );
    });
  });

  describe('list', () => {
    const query = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    };

    it('should return paginated interaction list', async () => {
      mockInteractionsRepository.findMany.mockResolvedValue({
        interactions: [mockInteractionWithRelations],
        total: 1,
      });

      const result = await interactionsService.list(tenantId, query);

      expect(result.interactions).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.totalPages).toBe(1);
    });

    it('should pass filters to repository', async () => {
      const filteredQuery = {
        ...query,
        clientId: 'client-456',
        userId: 'user-789',
        type: 'call' as const,
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
      };

      mockInteractionsRepository.findMany.mockResolvedValue({
        interactions: [],
        total: 0,
      });

      await interactionsService.list(tenantId, filteredQuery);

      expect(mockInteractionsRepository.findMany).toHaveBeenCalledWith({
        tenantId,
        page: 1,
        limit: 20,
        clientId: 'client-456',
        userId: 'user-789',
        type: 'call',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
    });
  });

  describe('getClientTimeline', () => {
    const query = {
      page: 1,
      limit: 20,
    };

    it('should return client timeline', async () => {
      mockInteractionsRepository.clientExists.mockResolvedValue(true);
      mockInteractionsRepository.findByClient.mockResolvedValue({
        interactions: [{ ...mockInteraction, user: mockUser }],
        total: 1,
      });

      const result = await interactionsService.getClientTimeline(tenantId, 'client-456', query);

      expect(result.clientId).toBe('client-456');
      expect(result.interactions).toHaveLength(1);
      expect(result.meta.total).toBe(1);
    });

    it('should throw NOT_FOUND if client does not exist', async () => {
      mockInteractionsRepository.clientExists.mockResolvedValue(false);

      await expectAppError(
        interactionsService.getClientTimeline(tenantId, 'non-existent', query),
        'NOT_FOUND'
      );
    });
  });

  describe('getStats', () => {
    it('should return interaction statistics', async () => {
      mockInteractionsRepository.countByType.mockResolvedValue([
        { type: 'call', count: 10 },
        { type: 'email', count: 20 },
      ]);
      mockInteractionsRepository.countByUser.mockResolvedValue([
        { userId: 'user-789', count: 15 },
      ]);
      mockInteractionsRepository.countTotal.mockResolvedValue(30);
      mockInteractionsRepository.countSince.mockResolvedValue(5);
      mockInteractionsRepository.getUsersWithCounts.mockResolvedValue([
        { id: 'user-789', firstName: 'Jane', lastName: 'Smith' },
      ]);

      const result = await interactionsService.getStats(tenantId);

      expect(result.byType).toHaveLength(2);
      expect(result.byUser).toHaveLength(1);
      expect(result.byUser[0]!.userName).toBe('Jane Smith');
      expect(result.total).toBe(30);
      expect(result.lastWeek).toBe(5);
    });
  });

  describe('create', () => {
    const createInput = {
      clientId: 'client-456',
      type: 'call' as const,
      notes: 'Follow-up call',
      metadata: { duration: 15 },
    };

    it('should create a new interaction', async () => {
      mockInteractionsRepository.clientExists.mockResolvedValue(true);
      mockInteractionsRepository.create.mockResolvedValue(mockInteractionWithRelations);

      const result = await interactionsService.create(tenantId, userId, createInput);

      expect(result.type).toBe('call');
      expect(mockInteractionsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantId,
          clientId: 'client-456',
          userId,
          type: 'call',
        })
      );
    });

    it('should throw INVALID_CLIENT if client does not exist', async () => {
      mockInteractionsRepository.clientExists.mockResolvedValue(false);

      await expectAppError(
        interactionsService.create(tenantId, userId, createInput),
        'INVALID_CLIENT'
      );
      expect(mockInteractionsRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateInput = {
      type: 'meeting' as const,
      notes: 'Updated notes',
    };

    it('should update an existing interaction', async () => {
      mockInteractionsRepository.exists.mockResolvedValue(true);
      mockInteractionsRepository.update.mockResolvedValue({
        ...mockInteractionWithRelations,
        type: 'meeting',
        notes: 'Updated notes',
      });

      const result = await interactionsService.update(tenantId, 'interaction-001', updateInput);

      expect(result.type).toBe('meeting');
      expect(result.notes).toBe('Updated notes');
    });

    it('should throw NOT_FOUND if interaction does not exist', async () => {
      mockInteractionsRepository.exists.mockResolvedValue(false);

      await expectAppError(
        interactionsService.update(tenantId, 'non-existent', updateInput),
        'NOT_FOUND'
      );
      expect(mockInteractionsRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete an interaction', async () => {
      mockInteractionsRepository.exists.mockResolvedValue(true);
      mockInteractionsRepository.remove.mockResolvedValue(mockInteraction);

      await interactionsService.remove(tenantId, 'interaction-001');

      expect(mockInteractionsRepository.remove).toHaveBeenCalledWith(tenantId, 'interaction-001');
    });

    it('should throw NOT_FOUND if interaction does not exist', async () => {
      mockInteractionsRepository.exists.mockResolvedValue(false);

      await expectAppError(
        interactionsService.remove(tenantId, 'non-existent'),
        'NOT_FOUND'
      );
      expect(mockInteractionsRepository.remove).not.toHaveBeenCalled();
    });
  });
});
