/**
 * Type-safe LocalStorage wrapper.
 *
 * Every module should read/write persisted state through this abstraction
 * instead of calling localStorage.getItem/setItem directly. This keeps
 * serialization, error handling, and SSR-safety in one place.
 */

const isBrowser = typeof window !== "undefined";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!isBrowser) return fallback;
    try {
      return safeParse<T>(window.localStorage.getItem(key), fallback);
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or unavailable (private mode) — fail silently.
    }
  },

  remove(key: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // no-op
    }
  },

  clear(): void {
    if (!isBrowser) return;
    try {
      window.localStorage.clear();
    } catch {
      // no-op
    }
  },
};
