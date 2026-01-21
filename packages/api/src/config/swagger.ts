import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger/OpenAPI configuration for MiGestion API.
 * Provides comprehensive API documentation for all endpoints.
 */

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MiGestion API',
    version: '1.0.0',
    description: `
## Multi-tenant SaaS CRM API

MiGestion is a professional CRM system designed for local businesses with enterprise-grade features.

### Features
- **Multi-tenant Architecture**: Complete data isolation per tenant
- **JWT Authentication**: Secure token-based auth with refresh tokens
- **Role-based Access Control**: Owner, Admin, Manager, User roles
- **Real-time Updates**: Socket.IO integration for live notifications
- **Audit Logging**: Complete audit trail for all operations

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer <access_token>
\`\`\`

### Rate Limiting
- Auth endpoints: 5 requests/minute
- API endpoints: 100 requests/minute
    `,
    contact: {
      name: 'MiGestion Support',
      email: 'support@migestion.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1',
    },
  ],
  tags: [
    { name: 'Auth', description: 'Authentication and authorization' },
    { name: 'Users', description: 'User management' },
    { name: 'Clients', description: 'Client management' },
    { name: 'Interactions', description: 'Client interaction tracking' },
    { name: 'Reports', description: 'Analytics and reports' },
    { name: 'Notifications', description: 'User notifications' },
    { name: 'Audit', description: 'Audit logs (admin only)' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT access token',
      },
    },
    schemas: {
      // Error responses
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'VALIDATION_ERROR' },
              message: { type: 'string', example: 'Validation failed' },
              details: { type: 'array', items: { type: 'object' } },
            },
          },
        },
      },
      // Pagination
      Pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer', example: 1 },
          limit: { type: 'integer', example: 20 },
          total: { type: 'integer', example: 100 },
          totalPages: { type: 'integer', example: 5 },
        },
      },
      // Auth
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 8, example: 'SecurePass123!' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['tenantName', 'tenantSlug', 'firstName', 'lastName', 'email', 'password'],
        properties: {
          tenantName: { type: 'string', example: 'Acme Corporation' },
          tenantSlug: { type: 'string', pattern: '^[a-z0-9-]+$', example: 'acme-corp' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          email: { type: 'string', format: 'email', example: 'john@acme.com' },
          password: { type: 'string', minLength: 8, example: 'SecurePass123!' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
              tenant: { $ref: '#/components/schemas/Tenant' },
              tokens: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string' },
                  refreshToken: { type: 'string' },
                  expiresAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
      // User
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          role: { type: 'string', enum: ['owner', 'admin', 'manager', 'user'] },
          status: { type: 'string', enum: ['active', 'inactive', 'invited'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      // Tenant
      Tenant: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          slug: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      // Client
      Client: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          companyName: { type: 'string', example: 'Acme Inc' },
          contactName: { type: 'string', example: 'Jane Smith' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          address: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive', 'prospect', 'churned'] },
          segment: { type: 'string' },
          notes: { type: 'string' },
          assignedTo: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CreateClientRequest: {
        type: 'object',
        required: ['companyName', 'contactName'],
        properties: {
          companyName: { type: 'string', example: 'New Client Inc' },
          contactName: { type: 'string', example: 'John Contact' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          address: { type: 'string' },
          status: {
            type: 'string',
            enum: ['active', 'inactive', 'prospect', 'churned'],
            default: 'prospect',
          },
          segment: { type: 'string' },
          notes: { type: 'string' },
          assignedToId: { type: 'string', format: 'uuid' },
        },
      },
      // Interaction
      Interaction: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          type: { type: 'string', enum: ['call', 'email', 'meeting', 'note', 'task'] },
          subject: { type: 'string' },
          description: { type: 'string' },
          outcome: { type: 'string' },
          scheduledAt: { type: 'string', format: 'date-time' },
          completedAt: { type: 'string', format: 'date-time' },
          client: { $ref: '#/components/schemas/Client' },
          createdBy: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      // Notification
      Notification: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          type: { type: 'string' },
          title: { type: 'string' },
          message: { type: 'string' },
          read: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      // Audit Log
      AuditLog: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          action: { type: 'string', example: 'CREATE' },
          entity: { type: 'string', example: 'client' },
          entityId: { type: 'string', format: 'uuid' },
          oldValues: { type: 'object' },
          newValues: { type: 'object' },
          ipAddress: { type: 'string' },
          userAgent: { type: 'string' },
          user: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      // Dashboard
      DashboardOverview: {
        type: 'object',
        properties: {
          clients: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              new: { type: 'integer' },
              byStatus: { type: 'object', additionalProperties: { type: 'integer' } },
            },
          },
          interactions: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              new: { type: 'integer' },
              byType: { type: 'object', additionalProperties: { type: 'integer' } },
            },
          },
          team: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              active: { type: 'integer' },
            },
          },
          trends: {
            type: 'object',
            properties: {
              clientsChange: { type: 'number' },
              interactionsChange: { type: 'number' },
            },
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Authentication required',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: {
              success: false,
              error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
            },
          },
        },
      },
      Forbidden: {
        description: 'Access denied',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: {
              success: false,
              error: { code: 'FORBIDDEN', message: 'Access denied' },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: {
              success: false,
              error: { code: 'NOT_FOUND', message: 'Resource not found' },
            },
          },
        },
      },
      ValidationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: {
              success: false,
              error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                details: [{ field: 'email', message: 'Invalid email format' }],
              },
            },
          },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/modules/**/*.routes.ts', './src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
