
import { kv } from "../../../lib/kv";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { content, ttl_seconds, max_views } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const id = uuid();
  const now = Date.now();
  const expires_at = ttl_seconds ? now + ttl_seconds * 1000 : null;

  await kv.set(id, {
    content,
    created_at: now,
    expires_at,
    max_views: max_views ?? null,
    views: 0
  });

  res.status(200).json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`
  });
}
