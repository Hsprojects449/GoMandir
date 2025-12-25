# GoMandir - Full-Stack Temple Pilgrimage Platform

A production-ready Next.js application for planning and managing temple pilgrimages across India, built with Supabase for authentication and data management.

## Features

✅ **User Authentication** - Sign up, login, password reset via Supabase Auth
✅ **Temple Discovery** - Browse temples with filtering, search, and favorites  
✅ **Trip Planning** - Create custom itineraries with dates and travelers
✅ **Itinerary Management** - Add activities, bookings, and track expenses
✅ **Reviews & Ratings** - Community-driven temple reviews
✅ **Profile Management** - Track visits, favorites, and trip history
✅ **Production Ready** - Security headers, env validation, error handling, SEO

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **TypeScript**: Full type safety
- **Deployment**: Vercel (recommended)

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account ([supabase.com](https://supabase.com))
- Git installed

### 2. Clone & Install

```bash
git clone <your-repo-url>
cd GoMandir
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at https://supabase.com/dashboard
2. Go to **Settings** → **API** and copy:
   - Project URL
   - anon/public key

3. Run the SQL migrations in order:
   - Go to **SQL Editor** in Supabase dashboard
   - Execute `scripts/001_create_tables.sql`
   - Execute `scripts/002_create_profile_trigger.sql`
   - Execute `scripts/003_seed_temples.sql` (optional sample data)

### 4. Environment Variables

Create `.env.local` in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Site URL (change per environment)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Database Schema

The app uses 8 main tables:

- **profiles** - User profiles (extends auth.users)
- **temples** - Temple information and metadata
- **trips** - User trip plans
- **trip_temples** - Many-to-many: trips ↔ temples
- **itinerary_items** - Daily activities per trip
- **bookings** - Transportation and accommodation bookings
- **reviews** - Temple reviews and ratings
- **favorites** - User favorite temples

All tables have Row Level Security (RLS) enabled. See `scripts/001_create_tables.sql` for full schema and policies.

## Key Features Implementation

### Authentication Flow
- Sign up creates a user in `auth.users` and automatically creates a profile via trigger
- Protected routes checked in `middleware.ts`
- Session management via Supabase SSR

### Trip Planning
1. User creates a trip (name, destination, dates, travelers)
2. Add temples from browse page
3. Build day-by-day itinerary with activities
4. Add bookings (train, flight, hotel, car, bus)
5. Track total expenses per category

### Temple Discovery
- Public temple database with search and filters
- Authenticated users can favorite temples
- Add temples directly to active trips
- Submit reviews and ratings

## Project Structure

```
app/
  ├── about/              # Static about page
  ├── api/
  │   └── health/         # Health check endpoint
  ├── auth/               # Auth pages (login, signup, etc.)
  ├── booking/            # Booking management
  ├── my-trips/           # User trips list & detail
  ├── plan-trip/          # Trip creation wizard
  ├── profile/            # User profile & stats
  ├── temples/            # Temple browse & detail
  ├── layout.tsx          # Root layout
  └── page.tsx            # Homepage

components/
  ├── booking/            # Booking form components
  ├── itinerary/          # Trip itinerary components
  ├── temples/            # Temple listing & detail
  ├── trips/              # Trip cards & lists
  └── ui/                 # shadcn/ui components

lib/
  ├── env.ts              # Environment validation (Zod)
  └── supabase/           # Supabase clients (browser, server, middleware)

scripts/
  ├── 001_create_tables.sql
  ├── 002_create_profile_trigger.sql
  └── 003_seed_temples.sql
```

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
4. Deploy!

### Security Checklist

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Environment variables validated at boot
- ✅ Security headers configured (CSP, HSTS, XFO)
- ✅ Auth middleware protects sensitive routes
- ✅ HTTPS enforced in production
- ⚠️ Rotate Supabase keys regularly
- ⚠️ Review RLS policies before launch
- ⚠️ Add rate limiting for API routes (recommended: Upstash)

### Monitoring & Observability

**Recommended Integrations:**
- **Sentry** - Error tracking (see `app/error.tsx` placeholder)
- **Vercel Analytics** - Already included
- **Logtail/Datadog** - Centralized logging
- **Uptime Robot** - Monitor `/api/health` endpoint

## Development Tips

### Adding New Tables

1. Create migration SQL in `scripts/`
2. Add RLS policies for security
3. Create TypeScript types (consider using Supabase CLI to generate)
4. Update components to query new tables

### Working with Supabase

```typescript
// Client-side (browser)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
const { data } = await supabase.from('temples').select('*')

// Server-side (server components, API routes)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
```

### Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
```

### Supabase connection issues
- Verify `.env.local` variables are correct
- Check Supabase project is not paused
- Ensure RLS policies allow your queries

### Build errors in production
- TypeScript strict mode is enabled - fix all type errors
- Check `next.config.mjs` - ensure no build-time issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (auth flow, CRUD operations)
5. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions:
- Open a GitHub issue
- Check Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs

---

**Built with ❤️ for spiritual travelers across India**
