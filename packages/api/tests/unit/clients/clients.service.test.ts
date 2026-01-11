// Mock Prisma client BEFORE importing client modules
jest.mock('@/infrastructure/prisma/client', () => ({
  prisma: {
    client: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
      updateMany: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: unknown) => Promise<unknown>) => fn({
      client: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  },
}));

import * as clientsService from '@/modules/clients/clients.service';
import * as clientsRepository from '@/modules/clients/clients.repository';
import { AppError } from '@/shared/errors';

// Mock the repository
jest.mock('@/modules/clients/clients.repository');

const mockClientsRepository = clientsRepository as jest.Mocked<typeof clientsRepository>;

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
 * Unit tests for clients service.
 */
describe('ClientsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tenantId = 'tenant-123';

  const mockClient = {
    id: 'client-456',
    tenantId,
    companyName: 'Acme Corp',
    contactName: 'John Doe',
    email: 'john@acme.com',
    phone: '+1234567890',
    status: 'active',
    segment: 'enterprise',
    tags: ['vip', 'tech'],
    customFields: { industry: 'Technology' },
    address: '123 Main St',
    notes: 'Important client',
    assignedToId: 'user-789',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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

  const mockClientWithUser = {
    ...mockClient,
    assignedTo: mockUser,
  };

  describe('getById', () => {
    it('should return client with assigned user', async () => {
      mockClientsRepository.findById.mockResolvedValue(mockClientWithUser);

      const result = await clientsService.getById(tenantId, 'client-456');

      expect(result).toBeDefined();
      expect(result.id).toBe('client-456');
      expect(result.companyName).toBe('Acme Corp');
      expect(result.assignedTo).toBeDefined();
      expect(result.assignedTo?.firstName).toBe('Jane');
      expect(mockClientsRepository.findById).toHaveBeenCalledWith(tenantId, 'client-456');
    });

    it('should throw NOT_FOUND if client does not exist', async () => {
      mockClientsRepository.findById.mockResolvedValue(null);

      await expectAppError(
        clientsService.getById(tenantId, 'non-existent'),
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

    it('should return paginated client list', async () => {
      mockClientsRepository.findMany.mockResolvedValue({
        clients: [mockClientWithUser],
        total: 1,
      });

      const result = await clientsService.list(tenantId, query);

      expect(result.clients).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.totalPages).toBe(1);
    });

    it('should pass filters to repository', async () => {
      const filteredQuery = {
        ...query,
        search: 'acme',
        status: 'active' as const,
        segment: 'enterprise',
        assignedToId: 'user-789',
      };

      mockClientsRepository.findMany.mockResolvedValue({
        clients: [],
        total: 0,
      });

      await clientsService.list(tenantId, filteredQuery);

      expect(mockClientsRepository.findMany).toHaveBeenCalledWith({
        tenantId,
        page: 1,
        limit: 20,
        search: 'acme',
        status: 'active',
        segment: 'enterprise',
        assignedToId: 'user-789',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
    });

    it('should calculate correct total pages', async () => {
      mockClientsRepository.findMany.mockResolvedValue({
        clients: Array(20).fill(mockClientWithUser),
        total: 55,
      });

      const result = await clientsService.list(tenantId, query);

      expect(result.meta.totalPages).toBe(3); // 55 / 20 = 2.75 -> 3
    });
  });

  describe('getSegments', () => {
    it('should return distinct segments', async () => {
      mockClientsRepository.findDistinctSegments.mockResolvedValue([
        'enterprise',
        'smb',
        'startup',
      ]);

      const result = await clientsService.getSegments(tenantId);

      expect(result).toEqual(['enterprise', 'smb', 'startup']);
    });
  });

  describe('getStatsByStatus', () => {
    it('should return client counts by status', async () => {
      mockClientsRepository.countByStatus.mockResolvedValue([
        { status: 'active', count: 10 },
        { status: 'prospect', count: 5 },
        { status: 'churned', count: 2 },
      ]);

      const result = await clientsService.getStatsByStatus(tenantId);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ status: 'active', count: 10 });
    });
  });

  describe('create', () => {
    const createInput = {
      companyName: 'New Company',
      contactName: 'Bob Wilson',
      email: 'bob@newcompany.com',
      phone: '+9876543210',
      status: 'prospect' as const,
      segment: 'smb',
      tags: ['new'],
      address: '456 Oak Ave',
      notes: 'New prospect',
    };

    it('should create a new client', async () => {
      mockClientsRepository.create.mockResolvedValue({
        ...mockClient,
        ...createInput,
        id: 'new-client-id',
        assignedTo: null,
      });

      const result = await clientsService.create(tenantId, createInput);

      expect(result.companyName).toBe('New Company');
      expect(mockClientsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantId,
          companyName: 'New Company',
          contactName: 'Bob Wilson',
        })
      );
    });

    it('should validate assigned user exists', async () => {
      const inputWithAssignment = {
        ...createInput,
        assignedToId: 'user-789',
      };

      mockClientsRepository.userExistsInTenant.mockResolvedValue(true);
      mockClientsRepository.create.mockResolvedValue({
        ...mockClient,
        ...inputWithAssignment,
        assignedTo: mockUser,
      });

      await clientsService.create(tenantId, inputWithAssignment);

      expect(mockClientsRepository.userExistsInTenant).toHaveBeenCalledWith(
        tenantId,
        'user-789'
      );
    });

    it('should throw INVALID_ASSIGNED_USER if user does not exist', async () => {
      const inputWithInvalidUser = {
        ...createInput,
        assignedToId: 'non-existent-user',
      };

      mockClientsRepository.userExistsInTenant.mockResolvedValue(false);

      await expectAppError(
        clientsService.create(tenantId, inputWithInvalidUser),
        'INVALID_ASSIGNED_USER'
      );
      expect(mockClientsRepository.create).not.toHaveBeenCalled();
    });

    it('should convert empty strings to null', async () => {
      const inputWithEmptyStrings = {
        companyName: 'Company',
        contactName: 'Contact',
        email: '',
        phone: '',
        status: 'prospect' as const,
      };

      mockClientsRepository.create.mockResolvedValue({
        ...mockClient,
        email: null,
        phone: null,
        assignedTo: null,
      });

      await clientsService.create(tenantId, inputWithEmptyStrings);

      expect(mockClientsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: null,
          phone: null,
        })
      );
    });
  });

  describe('update', () => {
    const updateInput = {
      companyName: 'Updated Company',
      status: 'active' as const,
    };

    it('should update an existing client', async () => {
      mockClientsRepository.exists.mockResolvedValue(true);
      mockClientsRepository.update.mockResolvedValue({
        ...mockClientWithUser,
        companyName: 'Updated Company',
      });

      const result = await clientsService.update(tenantId, 'client-456', updateInput);

      expect(result.companyName).toBe('Updated Company');
      expect(mockClientsRepository.update).toHaveBeenCalledWith(
        tenantId,
        'client-456',
        expect.objectContaining({ companyName: 'Updated Company' })
      );
    });

    it('should throw NOT_FOUND if client does not exist', async () => {
      mockClientsRepository.exists.mockResolvedValue(false);

      await expectAppError(
        clientsService.update(tenantId, 'non-existent', updateInput),
        'NOT_FOUND'
      );
      expect(mockClientsRepository.update).not.toHaveBeenCalled();
    });

    it('should validate assigned user on update', async () => {
      const updateWithAssignment = {
        assignedToId: 'new-user-id',
      };

      mockClientsRepository.exists.mockResolvedValue(true);
      mockClientsRepository.userExistsInTenant.mockResolvedValue(false);

      await expectAppError(
        clientsService.update(tenantId, 'client-456', updateWithAssignment),
        'INVALID_ASSIGNED_USER'
      );
    });

    it('should allow setting assignedToId to null', async () => {
      const updateWithNullAssignment = {
        assignedToId: null,
      };

      mockClientsRepository.exists.mockResolvedValue(true);
      mockClientsRepository.update.mockResolvedValue({
        ...mockClient,
        assignedToId: null,
        assignedTo: null,
      });

      await clientsService.update(tenantId, 'client-456', updateWithNullAssignment);

      expect(mockClientsRepository.userExistsInTenant).not.toHaveBeenCalled();
      expect(mockClientsRepository.update).toHaveBeenCalledWith(
        tenantId,
        'client-456',
        expect.objectContaining({ assignedToId: null })
      );
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      mockClientsRepository.exists.mockResolvedValue(true);
      mockClientsRepository.remove.mockResolvedValue(mockClient);

      await clientsService.remove(tenantId, 'client-456');

      expect(mockClientsRepository.remove).toHaveBeenCalledWith(tenantId, 'client-456');
    });

    it('should throw NOT_FOUND if client does not exist', async () => {
      mockClientsRepository.exists.mockResolvedValue(false);

      await expectAppError(
        clientsService.remove(tenantId, 'non-existent'),
        'NOT_FOUND'
      );
      expect(mockClientsRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('bulkUpdateStatus', () => {
    it('should update status for multiple clients', async () => {
      mockClientsRepository.updateManyStatus.mockResolvedValue(3);

      const result = await clientsService.bulkUpdateStatus(
        tenantId,
        ['client-1', 'client-2', 'client-3'],
        'inactive'
      );

      expect(result).toBe(3);
      expect(mockClientsRepository.updateManyStatus).toHaveBeenCalledWith(
        tenantId,
        ['client-1', 'client-2', 'client-3'],
        'inactive'
      );
    });

    it('should return 0 for empty client list', async () => {
      const result = await clientsService.bulkUpdateStatus(tenantId, [], 'inactive');

      expect(result).toBe(0);
      expect(mockClientsRepository.updateManyStatus).not.toHaveBeenCalled();
    });
  });

  describe('bulkAssign', () => {
    it('should assign multiple clients to a user', async () => {
      mockClientsRepository.userExistsInTenant.mockResolvedValue(true);
      mockClientsRepository.assignMany.mockResolvedValue(3);

      const result = await clientsService.bulkAssign(
        tenantId,
        ['client-1', 'client-2', 'client-3'],
        'user-789'
      );

      expect(result).toBe(3);
      expect(mockClientsRepository.userExistsInTenant).toHaveBeenCalledWith(tenantId, 'user-789');
    });

    it('should allow unassigning clients (null assignedToId)', async () => {
      mockClientsRepository.assignMany.mockResolvedValue(2);

      const result = await clientsService.bulkAssign(
        tenantId,
        ['client-1', 'client-2'],
        null
      );

      expect(result).toBe(2);
      expect(mockClientsRepository.userExistsInTenant).not.toHaveBeenCalled();
    });

    it('should throw INVALID_ASSIGNED_USER if user does not exist', async () => {
      mockClientsRepository.userExistsInTenant.mockResolvedValue(false);

      await expectAppError(
        clientsService.bulkAssign(tenantId, ['client-1'], 'non-existent-user'),
        'INVALID_ASSIGNED_USER'
      );
      expect(mockClientsRepository.assignMany).not.toHaveBeenCalled();
    });

    it('should return 0 for empty client list', async () => {
      const result = await clientsService.bulkAssign(tenantId, [], 'user-789');

      expect(result).toBe(0);
      expect(mockClientsRepository.assignMany).not.toHaveBeenCalled();
    });
  });
});
