
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [link, setLink] = useState("");

  const submit = async () => {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });
    const data = await res.json();
    setLink(data.url);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>
      <textarea rows={8} cols={60} value={content} onChange={e=>setContent(e.target.value)} />
      <br />
      TTL (seconds): <input value={ttl} onChange={e=>setTtl(e.target.value)} />
      <br />
      Max Views: <input value={views} onChange={e=>setViews(e.target.value)} />
      <br />
      <button onClick={submit}>Create Paste</button>
      {link && <p>Share: <a href={link}>{link}</a></p>}
    </main>
  );
}
