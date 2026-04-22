# Verex

Verex is a React + Vite application with:

- Public intake landing page at `/`
- Protected admin login at `/admin/login`
- Admin dashboard routes under `/admin/*`

## Development

Install dependencies:

```bash
npm install
```

Start local dev server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Create production build:

```bash
npm run build
```

## Required environment variables

Create a `.env` file (or copy `.env.example`) and set:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Optional for deployment path:

```bash
# Root deployment (default)
VITE_APP_BASE_PATH=/

# Subpath deployment example
# VITE_APP_BASE_PATH=/vertex-home/
```

Note: local `npm run dev` always serves from `/` to avoid route/base-path issues on `http://localhost:5173/`.

## Admin routes

- `/admin/login`
- `/admin`
- `/admin/submissions`
- `/admin/submissions/:id`
- `/admin/analytics`
- `/admin/settings`
