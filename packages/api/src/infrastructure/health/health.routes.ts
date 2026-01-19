import { Router } from 'express';
import { healthService } from './health.service.js';

const router = Router();

router.get('/health', async (_req, res, next) => {
  try {
    const health = await healthService.getHealth();
    const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    next(error);
  }
});

router.get('/health/live', async (_req, res) => {
  const liveness = await healthService.getLiveness();
  res.json(liveness);
});

router.get('/health/ready', async (_req, res, next) => {
  try {
    const readiness = await healthService.getReadiness();
    const statusCode = readiness.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(readiness);
  } catch (error) {
    next(error);
  }
});

export default router;
