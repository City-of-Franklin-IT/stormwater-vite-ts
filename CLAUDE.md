# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server on port 6000
npm run build        # TypeScript compile + Vite build
npm run test         # Run Vitest tests
npm run lint         # ESLint with zero warnings policy
npm run deploy       # SCP dist to remote server
```

## Architecture Overview

City of Franklin stormwater site inspection and violation tracking application.

**Stack:** React 18 + TypeScript, Vite, React Router 7, TanStack React Query, Azure MSAL (auth), Tailwind CSS + DaisyUI, ArcGIS (mapping)

**Environment:**
- Dev URL: https://dev.franklintn.gov/stormwater/
- API: https://api.franklin-gov.com/api/v2/eng/stormwater
- App base, title, API URLs and all MSAL settings are supplied via `VITE_*` env vars (see `.env.example`), typed in `src/vite-env.d.ts`. Copy `.env.example` → `.env` and `.env.development.example` → `.env.development`; both are git-ignored.

## Project Structure

- `src/components/` - Domain-organized (sites, contacts, enforcement, inspectors)
- `src/pages/` - Route pages
- `src/context/` - Global state (App API actions, Auth with MSAL)
- `src/helpers/` - Auth, token management, utilities
- `src/config/` - Environment configuration

## Component Organization Pattern

Each major component uses this directory structure:
```
ComponentName/
├── index.tsx       # Main export
├── hooks.ts        # Logic hooks (data fetching, state)
├── components.tsx  # Sub-components
```

## Key Patterns

**API Layer:** All API calls go through `context/App/AppActions.ts` - each function is documented with its REST endpoint and uses `authHeaders()` helper.

**State Management:**
- TanStack React Query for server state (queries use `staleTime: Infinity`)
- React Context for UI state
- Custom hooks for logic extraction

**Authentication:** Azure AD via MSAL (`@azure/msal-browser`). `AuthProvider` (`src/context/Auth/hooks/AuthProvider.tsx`) initializes the MSAL instance; `AuthCtxProvider` (`src/context/Auth/index.tsx`) acquires an **access token** for the `${VITE_ENTRA_CLIENT_ID}/.default` scope via `acquireTokenSilent`, falling back to a popup and then a login redirect, and refreshes it on tab focus and on any `401` response. `VITE_ENTRA_CLIENT_ID` is eng-api-ts's shared Entra API app registration, not this app's own `VITE_CLIENT_ID`. In development (`import.meta.env.DEV`) MSAL is bypassed and `VITE_MOCK_TOKEN` (`.env.development`) stands in as the access token. Use `useEnableQuery()` to tie query enabled state to token availability.

**Forms:** React Hook Form with consistent component patterns for inputs/labels/errors.

## Path Aliases

```
@/* → src/*
@components/* → src/components/*
@context/* → src/context/*
@helpers/* → src/helpers/*
@pages/* → src/pages/*
@utils/* → src/utils/*
```

## Code Style

- Write props inline rather than each on a new line
- Strict TypeScript (no unused locals/parameters)
- Zero ESLint warnings enforced