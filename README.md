
# Pastebin Lite

## Run Locally
npm install
npm run dev

## Persistence
Uses Vercel KV (Redis) for persistence across serverless requests.

## Notes
- Supports TTL and view limits
- Deterministic testing via TEST_MODE and x-test-now-ms
