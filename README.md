# Feature Voting System

A full-stack app where users can submit feature requests, upvote them, and see a live ranking by popularity.

## Stack

- **Next.js 16** — App Router, API routes
- **TypeScript**
- **Prisma 7** + **SQLite** — local database with migrations
- **SWR** — data fetching with optimistic updates
- **Tailwind CSS** — styling

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npx prisma migrate dev
```

### 3. (Optional) Seed with sample data

```bash
npm run seed
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Submit feature requests (title + description)
- Upvote / un-vote features
- Live vote count with optimistic updates
- Ranked list sorted by popularity
- Persistent user identity via `localStorage` (no auth required)

## Project Structure

```
app/
  api/
    features/route.ts          # GET (list) + POST (create)
    features/[id]/vote/route.ts # POST (toggle vote)
  page.tsx                     # Main page
components/
  FeatureCard.tsx              # Single feature with vote button
  FeatureList.tsx              # Sorted list with SWR
  SubmitForm.tsx               # Collapsible submit form
lib/
  prisma.ts                    # Prisma client singleton
  useUserId.ts                 # localStorage UUID hook
  types.ts                     # Shared TypeScript types
prisma/
  schema.prisma                # Feature + Vote models
  seed.ts                      # Sample data seed script
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/features?userId=` | List features sorted by votes, with `userVoted` flag |
| `POST` | `/api/features` | Create a feature `{ title, description }` |
| `POST` | `/api/features/[id]/vote` | Toggle vote `{ userId }` |
