# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **tool navigation website** (工具导航网站) - a full-stack Next.js application for browsing and managing a curated collection of tools. It includes public frontend pages and an authenticated admin dashboard.

## Quick Reference

### Commonly Used Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database (Prisma)
npm run prisma:generate       # Generate Prisma client (auto-runs postinstall)
npm run prisma:migrate:dev    # Run dev migrations (creates migration files)
npm run prisma:migrate:deploy # Run production migrations
npm run prisma:push            # Push schema directly (no migration files)
npm run prisma:seed            # Seed database with sample data + admin user
npm run prisma:studio          # Open Prisma Studio GUI at localhost:5555
```

**Note**: The README references `npm run db:push` and `npm run db:seed` but these are aliases in the README only - the actual package.json scripts use `prisma:*` prefixes.

### Environment Setup

Create `.env.local` with:
```env
DATABASE_URL="mysql://user:pass@localhost:3306/dbname"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Default Admin Credentials

After running `npm run prisma:seed`:
- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`

## Architecture

### High-Level Structure

This is a Next.js 16 App Router project with three distinct areas:

1. **Public Frontend** (`app/(frontend)/`, `app/page.tsx`, `app/about/`, `app/tool/[id]/`)
   - Responsive tool listing with search and category filtering
   - Tool detail pages
   - Static pages (about, privacy, terms)

2. **Admin Dashboard** (`app/admin/`)
   - Authenticated via NextAuth.js
   - Dashboard with statistics
   - Tool CRUD operations
   - Category CRUD operations

3. **API Routes** (`app/api/`)
   - `/api/auth/*` - NextAuth.js endpoints
   - `/api/tools/*` - Tool CRUD with auth for mutations
   - `/api/categories/*` - Category CRUD with auth for mutations

### Key Directories

- `components/` - Shared React components (ToolCard, CategoryFilter, AdminLayout, Navbar, AdBanner, Providers)
- `lib/` - Singleton Prisma client (`prisma.ts`) and NextAuth configuration (`auth.ts`)
- `prisma/` - Database schema and seed script

### Database Models

- **Category**: Has many Tools, has unique name and slug
- **Tool**: Belongs to one Category, supports featured flag, has rich text descriptions
- **User**: Admin users with username/password auth (bcrypt)

## Important Patterns

1. **Database**: Always use the singleton Prisma client from `lib/prisma.ts` - never instantiate new PrismaClient directly.
2. **Auth**: Server-side authentication uses `getServerSession()` from `lib/auth.ts`; client-side uses `useSession()` from `next-auth/react`.
3. **Route Groups**: The `(frontend)` route group separates public routes from admin routes but doesn't affect URL structure.
4. **Type Safety**: All API responses and database operations use TypeScript.

## Deployment

- Optimized for Vercel deployment
- MySQL-compatible databases supported (PlanetScale, Railway, AWS RDS, Aliyun RDS)
