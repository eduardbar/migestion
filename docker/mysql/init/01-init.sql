-- ─────────────────────────────────────────
-- MiGestion - Database Initialization
-- ─────────────────────────────────────────

-- Set character encoding
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Create database if not exists (already created by Docker, but just in case)
CREATE DATABASE IF NOT EXISTS migestion
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE migestion;

-- Grant privileges
GRANT ALL PRIVILEGES ON migestion.* TO 'migestion'@'%';
FLUSH PRIVILEGES;
