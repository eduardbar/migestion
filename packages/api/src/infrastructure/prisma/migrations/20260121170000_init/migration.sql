-- CreateEnum
CREATE TYPE "Role" AS ENUM ('owner', 'admin', 'manager', 'user');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('prospect', 'active', 'inactive', 'churned');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('call', 'email', 'meeting', 'note', 'task');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "settings" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "avatar_url" VARCHAR(500),
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),
    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "assigned_to_id" TEXT,
    "company_name" VARCHAR(200) NOT NULL,
    "contact_name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "status" VARCHAR(20) NOT NULL DEFAULT 'prospect',
    "segment" VARCHAR(50),
    "tags" JSONB,
    "custom_fields" JSONB,
    "address" VARCHAR(500),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "segments" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "criteria" JSONB,
    "color" VARCHAR(7),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "message" TEXT,
    "data" JSONB,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" VARCHAR(50) NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "entity_id" VARCHAR(36),
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE INDEX "tenants_status_idx" ON "tenants"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_email_key" ON "users"("tenant_id", "email");

-- CreateIndex
CREATE INDEX "users_tenant_id_status_idx" ON "users"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "users_tenant_id_role_idx" ON "users"("tenant_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "clients_tenant_id_status_idx" ON "clients"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "clients_tenant_id_segment_idx" ON "clients"("tenant_id", "segment");

-- CreateIndex
CREATE INDEX "clients_tenant_id_assigned_to_id_idx" ON "clients"("tenant_id", "assigned_to_id");

-- CreateIndex
CREATE INDEX "clients_tenant_id_company_name_idx" ON "clients"("tenant_id", "company_name");

-- CreateIndex
CREATE INDEX "interactions_tenant_id_client_id_idx" ON "interactions"("tenant_id", "client_id");

-- CreateIndex
CREATE INDEX "interactions_tenant_id_user_id_idx" ON "interactions"("tenant_id", "user_id");

-- CreateIndex
CREATE INDEX "interactions_tenant_id_created_at_idx" ON "interactions"("tenant_id", "created_at");

-- CreateIndex
CREATE INDEX "interactions_tenant_id_type_idx" ON "interactions"("tenant_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "segments_tenant_id_name_key" ON "segments"("tenant_id", "name");

-- CreateIndex
CREATE INDEX "notifications_tenant_id_user_id_idx" ON "notifications"("tenant_id", "user_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_idx" ON "notifications"("user_id", "read");

-- CreateIndex
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_created_at_idx" ON "audit_logs"("tenant_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_entity_idx" ON "audit_logs"("tenant_id", "entity");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_user_id_idx" ON "audit_logs"("tenant_id", "user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "segments" ADD CONSTRAINT "segments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
