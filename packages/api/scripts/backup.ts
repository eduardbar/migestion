#!/usr/bin/env node
import { backupService } from '../src/infrastructure/backup/backup.service.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'backup';

  switch (command) {
    case 'backup':
      console.log('Creating backup...');
      const backupResult = await backupService.createBackup();
      if (backupResult.success) {
        console.log(`✓ Backup created: ${backupResult.filename}`);
        console.log(`  Size: ${backupResult.size} bytes`);
        console.log(`  Path: ${backupResult.filepath}`);
        process.exit(0);
      } else {
        console.error(`✗ Backup failed: ${backupResult.error}`);
        process.exit(1);
      }

    case 'list':
      console.log('Listing backups...');
      const backups = await backupService.listBackups();
      if (backups.length === 0) {
        console.log('No backups found.');
      } else {
        console.log(`${backups.length} backup(s) found:\n`);
        backups.forEach(backup => {
          console.log(`  ${backup.filename}`);
          console.log(`    Size: ${backup.size} bytes`);
          console.log(`    Created: ${backup.created.toISOString()}`);
        });
      }
      break;

    case 'latest':
      console.log('Getting latest backup...');
      const latest = await backupService.getLatestBackup();
      if (latest) {
        console.log(`Latest backup: ${latest.filename}`);
        console.log(`Path: ${latest.filepath}`);
      } else {
        console.log('No backups found.');
      }
      break;

    case 'restore':
      const backupPath = args[1];
      if (!backupPath) {
        console.error('Usage: npm run db:restore -- <backup-path>');
        process.exit(1);
      }
      console.log(`Restoring from: ${backupPath}`);
      const restoreResult = await backupService.restoreBackup(backupPath);
      if (restoreResult.success) {
        console.log('✓ Restore completed successfully');
        process.exit(0);
      } else {
        console.error(`✗ Restore failed: ${restoreResult.error}`);
        process.exit(1);
      }

    default:
      console.log(`
MiGestion Backup CLI

Usage: node scripts/backup.js <command> [options]

Commands:
  backup           Create a new database backup
  list             List all existing backups
  latest           Show the latest backup
  restore <path>   Restore database from a backup file

Options:
  --output-dir     Directory for backup files (default: ./backups)
  --no-compression Disable gzip compression
  --retention      Days to retain backups (default: 30)
`);
      break;
  }
}

main().catch(error => {
  console.error('Backup script error:', error);
  process.exit(1);
});
