import { useAuthState } from '@/auth/auth-state/useAuthState.tsx';
import type { Session } from '@/auth/session/session.types.ts';
import type { SessionStore } from '@/auth/session/sessionStore.types.ts';
import { act, renderHook } from '@testing-library/react';

describe('use auth state hook', () => {
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

  const sessionStoreMock = {} as SessionStore;

  beforeEach(() => {
    sessionStoreMock.read = vi.fn();
    sessionStoreMock.write = vi.fn();
    sessionStoreMock.clear = vi.fn();
  });

  it('should return unauthenticated when no session exists', () => {
    vi.mocked(sessionStoreMock.read).mockReturnValueOnce(null);

    const { result } = renderHook(() => useAuthState(sessionStoreMock));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return authenticated when a session exists', () => {
    vi.mocked(sessionStoreMock.read).mockReturnValueOnce(session);

    const { result } = renderHook(() => useAuthState(sessionStoreMock));

    expect(result.current.isAuthenticated).toBe(true);
  });

  test('authenticate should authenticate the user', () => {
    vi.mocked(sessionStoreMock.read).mockReturnValueOnce(null);

    const { result } = renderHook(() => useAuthState(sessionStoreMock));

    act(() => {
      result.current.authenticate();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(sessionStoreMock.clear).not.toHaveBeenCalled();
  });

  test('logout should unauthenticate the user', () => {
    vi.mocked(sessionStoreMock.read).mockReturnValueOnce(session);

    const { result } = renderHook(() => useAuthState(sessionStoreMock));

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(sessionStoreMock.clear).toHaveBeenCalled();
  });
});
