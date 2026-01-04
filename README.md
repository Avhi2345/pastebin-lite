# Pastebin-Lite

A lightweight Pastebin-like web application that allows users to create text pastes and share them via a unique URL.  
Pastes can optionally expire based on time (TTL) or a maximum number of views.

This project is built as a take-home assignment and is designed to be compatible with automated testing.

---

## Features

- Create a text paste
- Generate a shareable URL
- View paste content via API and HTML page
- Optional time-based expiry (TTL)
- Optional view-count limit
- Deterministic time support for automated testing
- Serverless-safe persistent storage

---

## Tech Stack

- **Next.js (Node.js)**
- **Vercel KV (Redis)** for persistence
- **Vercel** for deployment

---

## API Endpoints

### Health Check
Returns:
```json
{ "ok": true }
POST /api/pastes
{
  "id": "string",
  "url": "https://<your-domain>/p/<id>"
}
#Running the Project Locally
1. Install dependencies
npm install
 2.Create .env.local
env
Copy code
NEXT_PUBLIC_BASE_URL=http://localhost:3000

KV_URL=your_kv_url
KV_REST_API_URL=your_kv_rest_url
KV_REST_API_TOKEN=your_kv_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token
3.Start the server
npm run dev
