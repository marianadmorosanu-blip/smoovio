# My Smoothie Buddy

Standalone Vite + React + TypeScript app connected to Supabase.

## Run locally

```bash
npm install
npm run dev
```

Create a `.env` file from `.env.example` and add your Supabase project values.

## Environment variables

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
```

## Database

The Supabase schema is in `supabase/migrations`. Apply it with the Supabase CLI:

```bash
npx supabase link --project-ref YOUR_PROJECT_ID
npx supabase db push
```

## Deploy

Build command: `npm run build`
Publish directory: `dist`
