# OctoFit Tracker Frontend

This frontend is built with React 19 + Vite and consumes backend endpoints from the logic tier.

## Required environment variable

Define VITE_CODESPACE_NAME so the frontend can target Codespaces URLs on port 8000:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

With that variable set, resource requests use this pattern:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

## Safe fallback behavior

If VITE_CODESPACE_NAME is not set, the app uses safe fallback URL rules to avoid undefined hostnames:

1. If running on an app.github.dev host, it swaps frontend port 5173 to backend port 8000.
2. Otherwise it falls back to http://localhost:8000.

## Scripts

- npm run dev
- npm run build
- npm run lint
- npm run preview
