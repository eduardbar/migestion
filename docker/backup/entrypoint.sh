#!/bin/sh
set -e

echo "Starting MiGestion Backup Service..."

BACKUP_DIR="/backups"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
BACKUP_SCHEDULE="${BACKUP_SCHEDULE:-0 2 * * *}"

mkdir -p "$BACKUP_DIR"

echo "Backup schedule: $BACKUP_SCHEDULE"
echo "Backup retention: $BACKUP_RETENTION_DAYS days"
echo "Backup directory: $BACKUP_DIR"

run_backup() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting scheduled backup..."

  cd /app/packages/api

  node scripts/backup.js backup --output-dir "$BACKUP_DIR" --retention "$BACKUP_RETENTION_DAYS"

  if [ $? -eq 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup completed successfully"
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup failed"
  fi
}

if [ "$1" = "now" ]; then
  echo "Running immediate backup..."
  run_backup
else
  echo "Installing cron..."
  echo "$BACKUP_SCHEDULE root run_backup >> /var/log/cron.log 2>&1" > /etc/crontabs/root
  echo "" >> /etc/crontabs/root

  echo "Starting cron daemon..."
  crond -l 2

  echo "Backup service ready. Waiting for scheduled backups..."
  run_backup

  tail -f /var/log/cron.log
fi
