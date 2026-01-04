
import { GetServerSideProps } from "next";
import { kv } from "../../lib/kv";

export default function Paste({ content, remainingViews, expiresAt }: any) {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      {remainingViews !== null && (
        <div style={{ marginBottom: '10px', color: '#666' }}>
          Remaining views: {remainingViews}
        </div>
      )}
      {expiresAt && (
        <div style={{ marginBottom: '10px', color: '#666' }} suppressHydrationWarning>
          Expires at: {expiresAt}
        </div>
      )}
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{content}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  try {
    const id = params!.id as string;
    const paste = await kv.get(id);
    
    if (!paste) {
      return { notFound: true };
    }

    const now = process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]
      ? Number(req.headers["x-test-now-ms"])
      : Date.now();

    if (paste.expires_at && now >= paste.expires_at) {
      return { notFound: true };
    }

    if (paste.max_views && paste.views >= paste.max_views) {
      return { notFound: true };
    }

    paste.views += 1;
    await kv.set(id, paste);

    return {
      props: {
        content: paste.content,
        remainingViews: paste.max_views ? paste.max_views - paste.views : null,
        expiresAt: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
      }
    };
  } catch (error) {
    console.error("Error fetching paste:", error);
    return { notFound: true };
  }
};
