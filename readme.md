# Inovus Backend API

A Node.js/Express backend built with **plain JavaScript** and Bun, implementing real estate management with RBAC, subscription plans, and feature management.

## Prerequisites
- Bun (latest)
- MongoDB

## Quick Start
```bash
bun install
cp .env.example .env
# Update DATABASE_URL in .env
bun run dev
```

## API Endpoints
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user (protected)
- `GET /api/users` - All users (admin)

## Auto-Seeded Data
On startup, creates:
- Roles: Super Admin, Admin, Agent
- Plans: Starter ($1000), Professional ($2500), Enterprise ($5000)
- Features: Property Listings, Lead Management, Analytics
