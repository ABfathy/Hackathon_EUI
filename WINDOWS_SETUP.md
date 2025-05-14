# Windows Setup Guide

If you're experiencing the error: `PrismaClientInitializationError: Prisma Client could not locate the Query Engine for runtime "windows"`, follow these steps:

## Setup Steps for Windows

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd Hackathon_EUI
   ```

2. **Run the setup script**
   ```
   node setup.js
   ```
   This script will:
   - Ensure Windows binaries are included in the Prisma schema
   - Configure Prisma for Supabase with pgbouncer
   - Generate the Prisma client for Windows

3. **Create or update your .env file**
   Make sure your .env file includes both DATABASE_URL and DIRECT_URL:
   ```
   DATABASE_URL="postgresql://postgres.odgkqmszkfndgmecpbey:password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.odgkqmszkfndgmecpbey:password@aws-0-eu-central-1.poole
4. **Install dependencies**
   ```
   pnpm install
   ```

5. **Start the development server**
   ```
   pnpm dev
   ```

## Troubleshooting

If you still encounter issues with Prisma:

1. **Delete the generated Prisma client**
   ```
   rmdir /s /q .\lib\generated\prisma
   ```

2. **Generate the Prisma client again**
   ```
   npx prisma generate
   ```

3. **Restart your development server**
   ```
   pnpm dev
   ```

If you continue to experience issues, contact the team lead for assistance.
