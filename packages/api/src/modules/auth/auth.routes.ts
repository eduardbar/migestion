import { Router } from 'express';
import * as authController from './auth.controller.js';
import { asyncHandler, authenticate, validateBody } from '../../shared/middlewares/index.js';
import { authRateLimiter } from '../../shared/middlewares/rate-limit.middleware.js';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.validator.js';

/**
 * Auth routes configuration.
 *
 * @remarks
 * Public routes:
 * - POST /register - Create new tenant + owner
 * - POST /login - Authenticate user
 * - POST /refresh - Refresh access token
 *
 * Protected routes:
 * - POST /logout - Revoke refresh token
 * - POST /logout-all - Revoke all tokens
 * - GET /me - Get current user
 */

const router = Router();

// ─────────────────────────────────────────
// Public Routes (with rate limiting)
// ─────────────────────────────────────────

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new tenant and owner
 *     description: Creates a new tenant organization and the owner user account
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: Email or slug already exists
 */
router.post(
  '/register',
  authRateLimiter,
  validateBody(registerSchema),
  asyncHandler(authController.register)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     description: Authenticate with email and password to receive access and refresh tokens
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  authRateLimiter,
  validateBody(loginSchema),
  asyncHandler(authController.login)
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Exchange a valid refresh token for new access and refresh tokens
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token received from login
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post(
  '/refresh',
  authRateLimiter,
  validateBody(refreshTokenSchema),
  asyncHandler(authController.refresh)
);

// ─────────────────────────────────────────
// Protected Routes
// ─────────────────────────────────────────

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current session
 *     description: Revokes the current refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/logout', authenticate, asyncHandler(authController.logout));

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Logout all sessions
 *     description: Revokes all refresh tokens for the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All sessions logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     revokedCount:
 *                       type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/logout-all', authenticate, asyncHandler(authController.logoutAll));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile and tenant information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     tenant:
 *                       $ref: '#/components/schemas/Tenant'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me', authenticate, asyncHandler(authController.me));

export default router;
