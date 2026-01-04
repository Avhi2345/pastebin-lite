
import { kv } from "../../../lib/kv";

export default async function handler(req, res) {
  const { id } = req.query;
  const paste = await kv.get(id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]
    ? Number(req.headers["x-test-now-ms"])
    : Date.now();

  if (paste.expires_at && now >= paste.expires_at) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.max_views && paste.views >= paste.max_views) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await kv.set(id, paste);

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.max_views ? paste.max_views - paste.views : null,
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
  });
}
