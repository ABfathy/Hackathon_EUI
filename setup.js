#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Detect OS
const platform = os.platform();
console.log(`Detected platform: ${platform}`);

// Create .env.example if it doesn't exist
const envExamplePath = path.join(__dirname, '.env.example');
if (!fs.existsSync(envExamplePath)) {
  const envExample = `# Supabase Database URLs
DATABASE_URL="postgresql://postgres.odgkqmszkfndgmecpbey:your-password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.odgkqmszkfndgmecpbey:your-password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Other environment variables
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="your-gemini-api-key"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
`;
  fs.writeFileSync(envExamplePath, envExample);
}

// Check for .env file
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('Created .env file (please update with your actual values)');
}

// Clean Prisma generated files
const prismaGenPath = path.join(__dirname, 'lib', 'generated', 'prisma');
if (fs.existsSync(prismaGenPath)) {
  try {
    fs.rmSync(prismaGenPath, { recursive: true, force: true });
  } catch (error) {
    console.log(`Warning: Could not remove directory: ${error.message}`);
  }
}

// Verify schema.prisma has correct binaryTargets
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Find the binaryTargets line
const binaryTargetsRegex = /binaryTargets\s*=\s*\[(.*?)\]/;
const binaryTargetsMatch = schema.match(binaryTargetsRegex);

if (binaryTargetsMatch) {
  const currentTargets = binaryTargetsMatch[1];
  
  // Check if windows is included
  if (!currentTargets.includes('windows')) {
    const updatedSchema = schema.replace(
      binaryTargetsRegex,
      `binaryTargets = [${currentTargets}, "windows"]`
    );
    fs.writeFileSync(schemaPath, updatedSchema);
    console.log('Updated schema.prisma with Windows binary target');
  }
}

// Check for Supabase pgbouncer compatibility
if (schema.includes('postgresql://') && !schema.includes('directUrl')) {
  // Add the directUrl parameter for pgbouncer compatibility
  const updatedSchema = schema.replace(
    'datasource db {',
    'datasource db {\n  directUrl = env("DIRECT_URL")'
  );
  
  fs.writeFileSync(schemaPath, updatedSchema);
  console.log('Updated schema.prisma for Supabase pgbouncer compatibility');
}

// Regenerate Prisma Client
try {
  console.log('Generating Prisma client for all platforms...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Successfully generated Prisma client');
} catch (error) {
  console.error('Failed to generate Prisma client:', error.message);
  process.exit(1);
}

// Install dependencies if needed
try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('Installing dependencies with pnpm...');
    execSync('pnpm install', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Warning: Error checking or installing dependencies:', error.message);
}

console.log('Setup complete. Your project should now work on this platform.');

// Show platform-specific instructions
if (platform === 'win32') {
  console.log('Windows-specific notes:');
  console.log('- Make sure PostgreSQL is installed and running');
  console.log('- Update your .env file with the correct database credentials');
  console.log('- The default PostgreSQL username on Windows is often "postgres"');
} else if (platform === 'darwin') {
  console.log('MacOS-specific notes:');
  console.log('- If you installed PostgreSQL with Homebrew, check the port it\'s running on');
  console.log('- Update your .env file with the correct database credentials');
}

console.log('To start the development server, run:');
console.log('pnpm dev');
