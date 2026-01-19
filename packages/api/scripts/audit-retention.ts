#!/usr/bin/env node
import { auditRetentionService } from '../src/infrastructure/audit/audit-retention.service.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'run';

  switch (command) {
    case 'run':
      console.log('Running audit retention cleanup...');
      const result = await auditRetentionService.runRetentionPolicy();
      console.log(`\nRetention Policy Results:`);
      console.log(`  Success: ${result.success}`);
      console.log(`  Total Deleted: ${result.totalDeleted}`);
      console.log(`  Timestamp: ${result.timestamp.toISOString()}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
      break;

    case 'stats':
      console.log('Getting audit retention stats...');
      const stats = await auditRetentionService.getRetentionStats();
      console.log(`\nAudit Statistics:`);
      console.log(`  Total Logs: ${stats.totalLogs}`);
      console.log(`  Tenants with Logs: ${stats.tenantsWithLogs}`);
      console.log(`  Oldest Log: ${stats.oldestLog?.toISOString() ?? 'N/A'}`);
      console.log(`  Newest Log: ${stats.newestLog?.toISOString() ?? 'N/A'}`);
      break;

    case 'cleanup':
      const tenantId = args[1];
      if (!tenantId) {
        console.error('Usage: node scripts/audit-retention.js cleanup <tenant-id>');
        process.exit(1);
      }
      console.log(`Cleaning up audit logs for tenant: ${tenantId}`);
      const tenantResult = await auditRetentionService.cleanupTenantLogs(tenantId);
      console.log(`\nTenant Cleanup Result:`);
      console.log(`  Success: ${tenantResult.success}`);
      console.log(`  Deleted: ${tenantResult.deletedCount}`);
      console.log(`  Retention Days: ${tenantResult.retentionDays}`);
      break;

    default:
      console.log(`
Audit Retention CLI

Usage: node scripts/audit-retention.js <command> [options]

Commands:
  run                 Run retention cleanup for all tenants
  stats               Show audit log statistics
  cleanup <tenant>    Clean up logs for specific tenant

Options:
  --retention         Days to retain (default: from AUDIT.RETENTION_DAYS config)
`);
      break;
  }
}

main().catch(error => {
  console.error('Audit retention script error:', error);
  process.exit(1);
});
