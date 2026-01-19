import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { logger } from '../../shared/utils/logger.js';

const execAsync = promisify(exec);
const log = logger;

interface BackupOptions {
  outputDir?: string;
  compression?: boolean;
  retentionDays?: number;
}

interface BackupResult {
  success: boolean;
  filename: string;
  filepath: string;
  size: number;
  timestamp: Date;
  error?: string;
}

export class BackupService {
  private readonly defaultOutputDir = './backups';
  private readonly defaultRetentionDays = 30;
  private readonly mysqlHost = process.env.DB_HOST || 'localhost';
  private readonly mysqlPort = process.env.DB_PORT || '3306';
  private readonly mysqlUser = process.env.DB_USER || 'migestion';
  private readonly mysqlPassword = process.env.DB_PASSWORD || 'migestion123';
  private readonly mysqlDatabase = process.env.DB_NAME || 'migestion';

  async createBackup(options: BackupOptions = {}): Promise<BackupResult> {
    const {
      outputDir = this.defaultOutputDir,
      compression = true,
      retentionDays = this.defaultRetentionDays,
    } = options;

    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0] ?? '';
    const timePart = timestamp.toTimeString().split(' ')[0] ?? '00-00-00';
    const timeStr = timePart.replace(/:/g, '-');
    const extension = compression ? '.sql.gz' : '.sql';
    const filename = `migestion_backup_${dateStr}_${timeStr}${extension}`;
    const filepath = path.resolve(outputDir, filename);

    try {
      await this.ensureDirectory(outputDir);

      const compressionFlag = compression ? ' | gzip' : '';
      const mysqldumpCmd = `mysqldump -h ${this.mysqlHost} -P ${this.mysqlPort} -u ${this.mysqlUser} -p"${this.mysqlPassword}" ${this.mysqlDatabase}${compressionFlag} > "${filepath}"`;

      log.info(`Starting database backup: ${filename}`);

      await execAsync(mysqldumpCmd, { timeout: 300000 }).catch((error: Error) => {
        throw new Error(`mysqldump failed: ${error.message}`);
      });

      const stats = await fs.promises.stat(filepath);
      const sizeInBytes = stats.size;

      log.info(`Backup completed successfully: ${filename} (${this.formatBytes(sizeInBytes)})`);

      await this.cleanupOldBackups(outputDir, retentionDays);

      return {
        success: true,
        filename,
        filepath,
        size: sizeInBytes,
        timestamp,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Backup failed: ${errorMessage}`);

      return {
        success: false,
        filename,
        filepath,
        size: 0,
        timestamp,
        error: errorMessage,
      };
    }
  }

  async restoreBackup(backupPath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const absolutePath = path.resolve(backupPath);

      if (!fs.existsSync(absolutePath)) {
        throw new Error(`Backup file not found: ${absolutePath}`);
      }

      const isGzipped = backupPath.endsWith('.gz');
      let restoreCmd: string;

      if (isGzipped) {
        restoreCmd = `gunzip -c "${absolutePath}" | mysql -h ${this.mysqlHost} -P ${this.mysqlPort} -u ${this.mysqlUser} -p"${this.mysqlPassword}" ${this.mysqlDatabase}`;
      } else {
        restoreCmd = `mysql -h ${this.mysqlHost} -P ${this.mysqlPort} -u ${this.mysqlUser} -p"${this.mysqlPassword}" ${this.mysqlDatabase} < "${absolutePath}"`;
      }

      log.info(`Starting database restore from: ${path.basename(backupPath)}`);

      await execAsync(restoreCmd, { timeout: 600000 });

      log.info('Database restore completed successfully');

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error(`Restore failed: ${errorMessage}`);

      return { success: false, error: errorMessage };
    }
  }

  async listBackups(
    outputDir: string = this.defaultOutputDir
  ): Promise<Array<{ filename: string; size: number; created: Date }>> {
    try {
      const absoluteDir = path.resolve(outputDir);

      if (!fs.existsSync(absoluteDir)) {
        return [];
      }

      const files = await fs.promises.readdir(absoluteDir);
      const backupFiles = files.filter(
        f => f.startsWith('migestion_backup_') && (f.endsWith('.sql') || f.endsWith('.sql.gz'))
      );

      const backups = await Promise.all(
        backupFiles.map(async filename => {
          const filepath = path.join(absoluteDir, filename);
          const stats = await fs.promises.stat(filepath);
          return {
            filename,
            size: stats.size,
            created: stats.birthtime,
          };
        })
      );

      return backups.sort((a, b) => b.created.getTime() - a.created.getTime());
    } catch (error) {
      log.error(`Failed to list backups: ${error}`);
      return [];
    }
  }

  async getLatestBackup(): Promise<{ filename: string; filepath: string } | null> {
    const backups = await this.listBackups();
    if (backups.length === 0) {
      return null;
    }

    const latestBackup = backups[0];
    if (!latestBackup) {
      return null;
    }
    const filepath = path.resolve(this.defaultOutputDir, latestBackup.filename);
    return { filename: latestBackup.filename, filepath };
  }

  private async ensureDirectory(dir: string): Promise<void> {
    const absoluteDir = path.resolve(dir);
    if (!fs.existsSync(absoluteDir)) {
      await fs.promises.mkdir(absoluteDir, { recursive: true });
      log.info(`Created backup directory: ${absoluteDir}`);
    }
  }

  private async cleanupOldBackups(outputDir: string, retentionDays: number): Promise<void> {
    try {
      const backups = await this.listBackups(outputDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      let deletedCount = 0;
      for (const backup of backups) {
        if (backup.created < cutoffDate) {
          const filepath = path.resolve(outputDir, backup.filename);
          await fs.promises.unlink(filepath);
          deletedCount++;
          log.info(`Deleted old backup: ${backup.filename}`);
        }
      }

      if (deletedCount > 0) {
        log.info(`Cleaned up ${deletedCount} old backup(s)`);
      }
    } catch (error) {
      log.error(`Failed to cleanup old backups: ${error}`);
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const backupService = new BackupService();
