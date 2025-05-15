# NISMA - Child Safety Platform

## Hackathon Project Overview

NISMA is a comprehensive child safety platform designed to protect children in Egypt through education, community awareness, and reporting tools. This project was developed for the EUI Hackathon 2025, focusing on creating innovative solutions for child safety and protection.

This application is built with Next.js, TypeScript, Tailwind CSS, and uses PostgreSQL for the database. It features a bilingual interface (English/Arabic) and responsive design for all devices.

## Instructions for Hackathon Judges

### Quick Setup Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ABfathy/Hackathon_EUI.git
   cd Hackathon_EUI
   ```

2. **Install Dependencies**
   ```bash
   npm install -g pnpm  # Skip if you already have pnpm installed
   pnpm install
   ```

3. **Setup the Database**
   ```bash
   # The .env file will be provided separately
   # Copy the provided .env file to the root directory
   ```

4. **Initialize Prisma**
   ```bash
   npx prisma generate  # Generates the Prisma client
   npx prisma migrate deploy  # Applies migrations to the database
   ```

5. **Run the Application**
   ```bash
   pnpm dev
   ```

6. **Access the Platform**
   - Open your browser and visit: `http://localhost:3000`
   - Demo credentials:
     - Parent account: `parent@example.com` / `password123`
     - Child account: `child@example.com` / `password123`

### Key Features to Evaluate

- **Bilingual Support**: Toggle between English and Arabic using the language selector in the header
- **Responsive Design**: Test on different device sizes to see the responsive layout
- **Interactive Maps**: Explore the safety map feature with location-based alerts
- **Support Forums**: Review the community support features with moderated discussions
- **Educational Resources**: Browse age-appropriate educational content for both parents and children
- **Reporting System**: Test the incident reporting system with anonymous submission options

## Project Architecture

### Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Maps Integration**: Google Maps API
- **Internationalization**: Custom language context for English/Arabic support

### Key Components

- **Safety Map**: Interactive map showing safe zones and potential danger areas
- **Community Forums**: Moderated discussion spaces for parents and children
- **Educational Resources**: Age-appropriate learning materials
- **Reporting System**: Anonymous incident reporting with alerts
- **Expert Counseling**: Connection to child safety professionals

### Project Structure

- `app/`: Next.js App Router with page components and API routes
  - `api/`: Backend API endpoints for data operations
  - `[locale]/`: Internationalized routes (en/ar)
  - Various feature directories (community, safety, etc.)
- `components/`: Reusable UI components organized by feature
- `prisma/`: Database schema and migrations
- `public/`: Static assets and images
- `context/`: React context providers for state management
- `lib/`: Utility functions and shared logic

## Quick Troubleshooting

If you encounter any issues during setup:

1. **Database Connection**: Ensure the provided .env file is correctly placed in the root directory. The database connection should work with the credentials in the file.

2. **Prisma Errors**: If you encounter Prisma-related errors, try these steps:
   ```bash
   npx prisma generate --force  # Regenerate the Prisma client
   npx prisma migrate reset  # Reset the database (will clear all data)
   ```

3. **Dependency Issues**: Run `pnpm install --force` to ensure all dependencies are properly installed.

4. **Port Conflicts**: If port 3000 is already in use, the application will automatically try to use the next available port.

5. **Browser Compatibility**: The application works best in Chrome, Firefox, or Edge.

## Project Impact & Innovation

### Problem Statement

Child safety in Egypt faces several challenges, including limited awareness, insufficient reporting mechanisms, and a lack of age-appropriate educational resources. NISMA addresses these challenges by providing a comprehensive platform that connects parents, children, educators, and authorities in a unified ecosystem.

### Innovative Approach

1. **Culturally Relevant**: Designed specifically for the Egyptian context with full Arabic language support and localized content

2. **Age-Appropriate Design**: Different interfaces and content for parents and children of various age groups

3. **Community-Driven**: Forums and community features that encourage knowledge sharing and support

4. **Real-Time Alerts**: Location-based safety alerts and incident reporting with verification mechanisms

5. **Educational Focus**: Interactive learning materials that teach safety concepts in an engaging way

### Social Impact

- **Awareness Building**: Increases community awareness about child safety issues
- **Prevention**: Provides tools and knowledge to prevent incidents before they occur
- **Support Network**: Creates a support system for families dealing with safety concerns
- **Data Collection**: Generates valuable data for authorities to identify trends and high-risk areas

## Technical Requirements

- Node.js v16 or higher
- pnpm (used instead of npm/yarn)

## Notes

- Use only `pnpm` to install dependencies.
- The `pnpm-lock.yaml` file ensures consistent installs.
- Do not commit `.env` files to version control.



