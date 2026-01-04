// Simple in-memory KV store for local development
// Replace this with @vercel/kv in production

class LocalKV {
  private store: Map<string, any> = new Map();

  async get(key: string) {
    console.log(`[KV] Getting key: ${key}, exists: ${this.store.has(key)}`);
    return this.store.get(key) || null;
  }

  async set(key: string, value: any) {
    console.log(`[KV] Setting key: ${key}`);
    this.store.set(key, value);
    return "OK";
  }

  async del(key: string) {
    return this.store.delete(key) ? 1 : 0;
  }
}

// Create a global singleton to persist across hot reloads
const globalForKV = global as typeof globalThis & {
  kvStore?: LocalKV;
};

if (!globalForKV.kvStore) {
  globalForKV.kvStore = new LocalKV();
}

// Use local KV for development if environment variables are not set
export const kv = process.env.KV_REST_API_URL?.startsWith('http') 
  ? require('@vercel/kv').kv 
  : globalForKV.kvStore;
