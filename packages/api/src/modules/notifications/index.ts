/**
 * Notifications Module Barrel Export.
 * Re-exports all public interfaces for the notifications module.
 */

export { notificationsRoutes } from './notifications.routes.js';
export * as notificationService from './notifications.service.js';
export * from './notifications.dto.js';
export * from './notifications.validator.js';
