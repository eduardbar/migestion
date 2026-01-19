/**
 * Users module barrel export.
 * Provides clean public API for the module.
 */

export { usersRoutes } from './users.routes.js';
export * from './users.dto.js';
export * from './users.validator.js';
export * as usersService from './users.service.js';
export * as usersRepository from './users.repository.js';
