import { useAuthState } from '@/auth/contexts/AuthProvider/useAuthState.tsx';
import { act, renderHook } from '@testing-library/react';

describe('use auth state hook', () => {
  const storageMock = {} as unknown as Storage;

  beforeEach(() => {
    storageMock.getItem = vi.fn();
    storageMock.setItem = vi.fn();
    storageMock.removeItem = vi.fn();
  });

  it('should return unauthenticated before login', () => {
    const { result } = renderHook(() => useAuthState(storageMock));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return authenticated after login', () => {
    vi.mocked(storageMock.getItem).mockReturnValueOnce('true');

    const { result } = renderHook(() => useAuthState(storageMock));

    expect(result.current.isAuthenticated).toBe(true);
  });

  test('login should authenticate the user', () => {
    const { result } = renderHook(() => useAuthState(storageMock));

    act(() => {
      result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(storageMock.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
  });

  test('logout should unauthenticate the user', () => {
    const { result } = renderHook(() => useAuthState(storageMock));

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(storageMock.removeItem).toHaveBeenCalledWith('isAuthenticated');
  });
});
