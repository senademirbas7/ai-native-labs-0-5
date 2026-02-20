/* LocalStorage adapter per Memory Banks coding standards.
 * Provides safe get/set/remove and import/export utilities
 */

export const LOCALSTORAGE_KEY_TASKS_V1 = "stb:tasks:v1";

function isQuotaError(err: unknown): boolean {
  try {
    // DOMException check (browsers differ)
    const e = err as any;
    return (
      e instanceof DOMException ||
      e?.name === "QuotaExceededError" ||
      /quota/i.test(String(e?.message || ""))
    );
  } catch {
    return false;
  }
}

const memoryCache: Record<string, unknown> = {};

export const LocalStorageAdapter = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn("LocalStorage get failed, falling back to memory cache:", err);
      return (memoryCache[key] as T) ?? null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
      memoryCache[key] = value;
    } catch (err) {
      if (isQuotaError(err)) {
        console.warn("LocalStorage quota exceeded while setting key:", key);
        // Keep in-memory copy so UI can continue working
        memoryCache[key] = value;
        // Re-throw so callers can show UI recovery options if desired
        throw err;
      }
      console.warn("LocalStorage set failed, using memory cache:", err);
      memoryCache[key] = value;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
      delete memoryCache[key];
    } catch (err) {
      console.warn("LocalStorage remove failed:", err);
      delete memoryCache[key];
    }
  },

  export(): string {
    const payload: Record<string, unknown> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith("stb:")) {
          try {
            payload[k] = JSON.parse(localStorage.getItem(k) as string);
          } catch {
            payload[k] = null;
          }
        }
      }
    } catch (err) {
      console.warn("Error exporting localStorage keys:", err);
    }
    return JSON.stringify(payload);
  },

  import(json: string): void {
    try {
      const parsed = JSON.parse(json) as Record<string, unknown>;
      for (const k of Object.keys(parsed)) {
        try {
          const raw = JSON.stringify(parsed[k]);
          localStorage.setItem(k, raw);
          memoryCache[k] = parsed[k];
        } catch (err) {
          console.warn("Failed to import key", k, err);
        }
      }
    } catch (err) {
      console.warn("Failed to parse import JSON", err);
      throw err;
    }
  },
};

export default LocalStorageAdapter;
