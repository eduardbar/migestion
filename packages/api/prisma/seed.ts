/**
 * Prisma Seed File
 * Creates test data for development and demo purposes.
 * 
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const SALT_ROUNDS = 10;

const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

const CLIENT_STATUSES = ['prospect', 'active', 'inactive', 'churned'];
const INTERACTION_TYPES = ['call', 'email', 'meeting', 'note', 'task'];
const SEGMENTS = ['Enterprise', 'SMB', 'Startup', 'Government', 'Non-profit'];
const SEGMENT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateCompanyName(index: number): string {
  const prefixes = ['Tech', 'Digital', 'Cloud', 'Smart', 'Global', 'Pro', 'Next', 'Alpha', 'Prime', 'Elite'];
  const suffixes = ['Solutions', 'Systems', 'Corp', 'Inc', 'Labs', 'Group', 'Services', 'Dynamics', 'Ventures', 'Partners'];
  return `${prefixes[index % prefixes.length]} ${suffixes[Math.floor(index / prefixes.length) % suffixes.length]}`;
}

function generateContactName(index: number): string {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Jessica',
                      'Carlos', 'Maria', 'James', 'Anna', 'Daniel', 'Sofia', 'Thomas', 'Laura', 'Andrew', 'Rachel'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                     'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  return `${firstNames[index % firstNames.length]} ${lastNames[Math.floor(index / firstNames.length) % lastNames.length]}`;
}

function generateEmail(name: string, company: string): string {
  const cleanName = name.toLowerCase().replace(' ', '.');
  const cleanCompany = company.toLowerCase().replace(/[^a-z]/g, '');
  return `${cleanName}@${cleanCompany}.com`;
}

function generatePhone(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `+1 (${areaCode}) ${prefix}-${line}`;
}

function generateInteractionNote(type: string): string {
  const notes: Record<string, string[]> = {
    call: [
      'Discussed pricing options and upcoming renewal.',
      'Follow-up call regarding their support ticket.',
      'Introduced new product features, very interested.',
      'Quarterly check-in call, satisfied with service.',
      'Cold call - scheduled demo for next week.',
    ],
    email: [
      'Sent proposal for Q4 expansion.',
      'Followed up on pending invoice.',
      'Shared case study and testimonials.',
      'Responded to feature request inquiry.',
      'Sent welcome email with onboarding guide.',
    ],
    meeting: [
      'On-site visit to discuss enterprise agreement.',
      'Virtual demo of new dashboard features.',
      'Quarterly business review - positive feedback.',
      'Training session for new team members.',
      'Strategy meeting for upcoming year.',
    ],
    note: [
      'Key decision maker is the CTO.',
      'Prefers communication via email.',
      'Budget approval needed from finance team.',
      'Competitor evaluation in progress.',
      'Champion for our product internally.',
    ],
    task: [
      'Send updated contract by Friday.',
      'Schedule follow-up call in 2 weeks.',
      'Prepare custom demo for their use case.',
      'Research their industry for better pitch.',
      'Add to newsletter mailing list.',
    ],
  };
  return randomElement(notes[type] || notes.note);
}

// ─────────────────────────────────────────
// Seed Functions
// ─────────────────────────────────────────

async function seedTenant() {
  console.log('Creating tenant...');
  
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
      status: 'active',
      settings: {
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
      },
    },
  });

  console.log(`✓ Tenant created: ${tenant.name} (${tenant.id})`);
  return tenant;
}

async function seedUsers(tenantId: string) {
  console.log('Creating users...');
  
  const passwordHash = await hashPassword('Demo123!');
  
  const usersData = [
    {
      email: 'owner@demo.com',
      firstName: 'Alex',
      lastName: 'Owner',
      role: ROLES.OWNER,
      status: 'active',
    },
    {
      email: 'admin@demo.com',
      firstName: 'Jordan',
      lastName: 'Admin',
      role: ROLES.ADMIN,
      status: 'active',
    },
    {
      email: 'manager@demo.com',
      firstName: 'Taylor',
      lastName: 'Manager',
      role: ROLES.MANAGER,
      status: 'active',
    },
    {
      email: 'user1@demo.com',
      firstName: 'Morgan',
      lastName: 'Sales',
      role: ROLES.USER,
      status: 'active',
    },
    {
      email: 'user2@demo.com',
      firstName: 'Casey',
      lastName: 'Support',
      role: ROLES.USER,
      status: 'active',
    },
  ];

  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: {
        tenantId_email: {
          tenantId,
          email: userData.email,
        },
      },
      update: {},
      create: {
        tenantId,
        ...userData,
        passwordHash,
        lastLoginAt: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
      },
    });
    users.push(user);
    console.log(`  ✓ User: ${user.email} (${user.role})`);
  }

  return users;
}

async function seedSegments(tenantId: string) {
  console.log('Creating segments...');
  
  const segments = [];
  for (let i = 0; i < SEGMENTS.length; i++) {
    const segment = await prisma.segment.upsert({
      where: {
        tenantId_name: {
          tenantId,
          name: SEGMENTS[i],
        },
      },
      update: {},
      create: {
        tenantId,
        name: SEGMENTS[i],
        color: SEGMENT_COLORS[i],
        criteria: {
          tags: [SEGMENTS[i].toLowerCase()],
        },
      },
    });
    segments.push(segment);
    console.log(`  ✓ Segment: ${segment.name}`);
  }

  return segments;
}

async function seedClients(tenantId: string, userIds: string[]) {
  console.log('Creating clients...');
  
  const clients = [];
  const clientCount = 50;
  const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < clientCount; i++) {
    const companyName = generateCompanyName(i);
    const contactName = generateContactName(i);
    const email = generateEmail(contactName, companyName);
    
    const client = await prisma.client.create({
      data: {
        tenantId,
        companyName,
        contactName,
        email,
        phone: generatePhone(),
        status: randomElement(CLIENT_STATUSES),
        segment: randomElement(SEGMENTS),
        assignedToId: Math.random() > 0.2 ? randomElement(userIds) : null,
        tags: [randomElement(['priority', 'vip', 'new', 'renewal', 'upsell'])],
        notes: `Initial contact established. ${randomElement(['Referred by partner.', 'Found via website.', 'Trade show lead.', 'Cold outreach.'])}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Business Ave, Suite ${Math.floor(Math.random() * 500) + 1}`,
        createdAt: randomDate(threeMonthsAgo, new Date()),
      },
    });
    clients.push(client);
  }

  console.log(`  ✓ Created ${clients.length} clients`);
  return clients;
}

async function seedInteractions(
  tenantId: string,
  clients: { id: string }[],
  userIds: string[]
) {
  console.log('Creating interactions...');
  
  let interactionCount = 0;
  const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  for (const client of clients) {
    // Each client gets 1-8 interactions
    const numInteractions = Math.floor(Math.random() * 8) + 1;
    
    for (let i = 0; i < numInteractions; i++) {
      const type = randomElement(INTERACTION_TYPES);
      
      await prisma.interaction.create({
        data: {
          tenantId,
          clientId: client.id,
          userId: randomElement(userIds),
          type,
          notes: generateInteractionNote(type),
          metadata: {
            duration: type === 'call' || type === 'meeting' ? `${Math.floor(Math.random() * 60) + 5} minutes` : undefined,
            outcome: randomElement(['positive', 'neutral', 'needs-followup']),
          },
          createdAt: randomDate(threeMonthsAgo, new Date()),
        },
      });
      interactionCount++;
    }
  }

  console.log(`  ✓ Created ${interactionCount} interactions`);
}

async function seedNotifications(tenantId: string, userIds: string[]) {
  console.log('Creating notifications...');
  
  const notificationTypes = [
    { type: 'client_assigned', title: 'New client assigned', message: 'You have been assigned a new client.' },
    { type: 'interaction_created', title: 'New activity logged', message: 'A new interaction was logged for your client.' },
    { type: 'reminder', title: 'Follow-up reminder', message: 'Remember to follow up with your pending leads.' },
    { type: 'system', title: 'Welcome to MiGestion!', message: 'Get started by exploring your dashboard.' },
  ];

  let count = 0;
  for (const userId of userIds) {
    // Each user gets 3-6 notifications
    const numNotifications = Math.floor(Math.random() * 4) + 3;
    
    for (let i = 0; i < numNotifications; i++) {
      const notif = randomElement(notificationTypes);
      
      await prisma.notification.create({
        data: {
          tenantId,
          userId,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          read: Math.random() > 0.6,
          createdAt: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
        },
      });
      count++;
    }
  }

  console.log(`  ✓ Created ${count} notifications`);
}

// ─────────────────────────────────────────
// Main Seed Function
// ─────────────────────────────────────────

async function main() {
  console.log('\n🌱 Starting database seed...\n');
  
  try {
    // Create tenant
    const tenant = await seedTenant();
    
    // Create users
    const users = await seedUsers(tenant.id);
    const userIds = users.map((u) => u.id);
    
    // Create segments
    await seedSegments(tenant.id);
    
    // Create clients
    const clients = await seedClients(tenant.id, userIds);
    
    // Create interactions
    await seedInteractions(tenant.id, clients, userIds);
    
    // Create notifications
    await seedNotifications(tenant.id, userIds);
    
    console.log('\n✅ Database seeded successfully!\n');
    console.log('Demo credentials:');
    console.log('  Email: owner@demo.com');
    console.log('  Password: Demo123!\n');
    console.log('Other test accounts: admin@demo.com, manager@demo.com, user1@demo.com, user2@demo.com');
    console.log('(All use the same password: Demo123!)\n');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
