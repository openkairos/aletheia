import type { Session } from '@/auth/session/session.types.ts';

export interface SessionStore {
  read: () => Session | null;
  write: (session: Session) => void;
  clear: () => void;
}
