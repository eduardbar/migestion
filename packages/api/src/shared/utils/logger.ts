import winston from 'winston';
import { env, isProduction } from '../../config/index.js';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

/**
 * Custom log format for development.
 */
const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(meta).length > 0) {
    log += ` ${JSON.stringify(meta)}`;
  }
  
  if (stack) {
    log += `\n${stack}`;
  }
  
  return log;
});

/**
 * Application logger configured for different environments.
 * 
 * @remarks
 * - Development: Colorized console output with readable format
 * - Production: JSON format for log aggregation services
 */
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: { service: 'migestion-api' },
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? combine(json())
        : combine(colorize(), devFormat),
    }),
  ],
});

/**
 * Request logging helper with consistent format.
 */
export function logRequest(
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  userId?: string
): void {
  logger.info('HTTP Request', {
    method,
    path,
    statusCode,
    duration: `${duration}ms`,
    userId,
  });
}

/**
 * Error logging helper with stack trace.
 */
export function logError(error: Error, context?: Record<string, unknown>): void {
  logger.error(error.message, {
    stack: error.stack,
    ...context,
  });
}
