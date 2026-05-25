import { createLocalStorageSessionStore } from '@/auth/session/localStorageSessionStore.ts';
import type { Session } from '@/auth/session/session.types.ts';

const session: Session = {
  user: {
    id: '6a12eb9ab0b954cf6a367f92',
    username: 'admin',
    email: 'admin@example.com',
    roles: ['ROLE_SUPER_ADMIN'],
  },
  token: {
    tokenType: 'Bearer',
    expiresIn: 3600,
    accessToken: 'access-token',
  },
};

function createStorageMock(values: Record<string, string | null> = {}) {
  return {
    getItem: vi.fn((key: string) => values[key] ?? null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  } as unknown as Storage;
}

describe('localStorageSessionStore', () => {
  it('should read null when no session exists', () => {
    const storage = createStorageMock();
    const sessionStore = createLocalStorageSessionStore(storage);

    expect(sessionStore.read()).toBeNull();
  });

  it('should write serialized session', () => {
    const storage = createStorageMock();
    const sessionStore = createLocalStorageSessionStore(storage);

    sessionStore.write(session);

    expect(storage.setItem).toHaveBeenCalledWith('aletheia.session', JSON.stringify(session));
  });

  it('should read stored session', () => {
    const storage = createStorageMock({ 'aletheia.session': JSON.stringify(session) });
    const sessionStore = createLocalStorageSessionStore(storage);

    expect(sessionStore.read()).toEqual(session);
  });

  it('should read null when stored session is malformed', () => {
    const storage = createStorageMock({ 'aletheia.session': '{' });
    const sessionStore = createLocalStorageSessionStore(storage);

    expect(sessionStore.read()).toBeNull();
  });

  it('should clear stored session', () => {
    const storage = createStorageMock();
    const sessionStore = createLocalStorageSessionStore(storage);

    sessionStore.clear();

    expect(storage.removeItem).toHaveBeenCalledWith('aletheia.session');
  });
});
