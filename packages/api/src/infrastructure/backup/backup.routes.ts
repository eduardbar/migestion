import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { backupService } from './backup.service.js';
import { authenticate } from '../../shared/middlewares/auth.middleware.js';
import { Role } from '../../config/constants.js';

const router = Router();

const restoreRequestSchema = z.object({
  backupPath: z.string().min(1, 'Backup path is required'),
});

function requireRole(allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new Error('Authentication required'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new Error('Insufficient permissions'));
    }
    next();
  };
}

router.post(
  '/backup',
  authenticate,
  requireRole(['owner', 'admin']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = {
        outputDir: req.body.outputDir,
        compression: req.body.compression ?? true,
        retentionDays: req.body.retentionDays,
      };

      const result = await backupService.createBackup(options);

      res.status(result.success ? 201 : 500).json({
        success: result.success,
        message: result.success ? 'Backup created successfully' : 'Backup failed',
        data: {
          filename: result.filename,
          size: result.size,
          timestamp: result.timestamp.toISOString(),
        },
        error: result.error,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/restore',
  authenticate,
  requireRole(['owner']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { backupPath } = restoreRequestSchema.parse(req.body);

      const result = await backupService.restoreBackup(backupPath);

      res.status(result.success ? 200 : 500).json({
        success: result.success,
        message: result.success ? 'Database restored successfully' : 'Restore failed',
        error: result.error,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/backups',
  authenticate,
  requireRole(['owner', 'admin']),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const backups = await backupService.listBackups();

      res.json({
        success: true,
        data: backups.map(backup => ({
          filename: backup.filename,
          size: backup.size,
          sizeFormatted: formatBytes(backup.size),
          created: backup.created.toISOString(),
        })),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/backups/latest',
  authenticate,
  requireRole(['owner', 'admin']),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const latest = await backupService.getLatestBackup();

      res.json({
        success: true,
        data: latest,
      });
    } catch (error) {
      next(error);
    }
  }
);

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default router;
