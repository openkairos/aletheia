import type { Session } from '@/auth/session/session.types.ts';
import type { SessionStore } from '@/auth/session/sessionStore.types.ts';

const SESSION_STORAGE_KEY = 'aletheia.session';

const parseSession = (value: string): Session | null => {
  try {
    return JSON.parse(value) as Session;
  } catch {
    return null;
  }
};

export const createLocalStorageSessionStore = (storage: Storage): SessionStore => ({
  read: () => {
    const value = storage.getItem(SESSION_STORAGE_KEY);

    return value === null ? null : parseSession(value);
  },
  write: (session: Session) => {
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  },
  clear: () => {
    storage.removeItem(SESSION_STORAGE_KEY);
  },
});
