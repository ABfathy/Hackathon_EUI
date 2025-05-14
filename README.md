# NISMA

This is a Next.js project built with TypeScript, Tailwind CSS, and pnpm. It was bootstrapped using components from v0.dev.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ABfathy/Hackathon_EUI.git
cd Hackathon_EUI
```

### 2. Install pnpm (if not installed)

```bash
npm install -g pnpm
```

### 3. Run the Setup Script (IMPORTANT!)

This step is critical for cross-platform compatibility (Mac/Windows):

```bash
node setup.js
```

This script will:
- Check and create environment files
- Clean existing Prisma generated files
- Update the Prisma schema if needed
- Generate Prisma client for your platform
- Check dependencies

### 4. Configure Your Environment

Update the `.env` file with your database connection:

```
# For Windows users (typically)
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/nismah?schema=public"

# For Mac users (if using a different username)
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/nismah?schema=public"
```

### 5. Run the Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

## Troubleshooting

### Prisma Client Errors

If you encounter Prisma initialization errors like:

```
PrismaClientInitializationError: Prisma Client could not locate the Query Engine for runtime "windows"
```

Try these steps:

1. Make sure you've run the setup script:
   ```bash
   node setup.js
   ```

2. If the error persists, manually regenerate the Prisma client:
   ```bash
   npx prisma generate
   ```

3. Check that your database is running and accessible with the credentials in your `.env` file

4. For Windows users, ensure you have PostgreSQL installed and running as a service

### Database Connection Issues

1. Verify your PostgreSQL installation is running
2. Check the port number in your connection string (default is 5432)
3. Ensure your username and password are correct
4. For Windows users, the default username is often `postgres`
5. Try connecting to the database using a tool like pgAdmin to verify credentials

## File Overview

- `app/`: Routes and layouts (Next.js App Router)
- `components/`: Reusable UI components
- `context/`: React context providers
- `hooks/`: Custom hooks
- `lib/`: Utility functions
- `public/`: Static assets
- `styles/`: Tailwind/global styles
- `tailwind.config.ts`: Tailwind CSS config
- `tsconfig.json`: TypeScript config
- `next.config.mjs`: Next.js config

## Requirements

- Node.js v16 or higher
- pnpm (used instead of npm/yarn)

## Notes

- Use only `pnpm` to install dependencies.
- The `pnpm-lock.yaml` file ensures consistent installs.
- Do not commit `.env` files to version control.



