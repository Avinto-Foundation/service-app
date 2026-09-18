# Servio

Browse, search, and filter local home services — plumbers, electricians, cleaners — and view detailed profiles.

> React frontend for the Service Django API.

## Quick Start

```bash
git clone https://github.com/you/service-app.git
cd service-app
npm install
npm run dev
```

App runs at http://localhost:5173

 **The Django backend must be running at http://127.0.0.1:8000** 
**Docker:**

```bash
docker build -t service-app .
docker run -p 5173:5173 service-app
```

## Setup

**Requirements:** Node 20+

## Configuration

The backend URL is hardcoded (`http://127.0.0.1:8000`) in `Home.tsx`, `Profile.tsx`, `Login.tsx`, and `Signup.tsx`. Change it there if your backend runs elsewhere.

## Usage

| Page | Route | Description |
|---|---|---|
| Home | `/` | Search, filter by category/rating, view service cards |
| Profile | `/profile/:id` | Service details |
| Login | `/login` | Email + password login |
| Signup | `/signup` | Create account (with profile picture) |

## Folder Structure

```
├── src/
│   ├── components/
│   │   ├── Card.tsx        # service card
│   │   ├── Filter.tsx      # category + rating filters
│   │   ├── Profile.tsx     # service detail page
│   │   └── SearchBar.tsx   # search input
│   ├── Home.tsx            # main page
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── App.tsx             # routes
│   ├── type.ts             # Service type
│   └── App.css
├── Dockerfile
├── vite.config.ts
└── package.json
```

## Troubleshooting

- **"Cannot connect to server"** → the Django backend isn't running. Start it on port 8000.
- **CORS errors in browser console** → make sure the backend has `CORS_ALLOW_ALL_ORIGINS = True` (or allows `http://localhost:5173`).
- **Empty service list** → backend has no data. Run `python manage.py loaddata seed_data.json` in the backend.

## Contributing

Branch from `main`, name it `feature/...` or `fix/...`, and open a PR.
