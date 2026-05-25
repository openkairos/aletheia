import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import { useLoginForm } from '@/auth/login/useLoginForm.ts';
import type { Auth } from '@/auth/types.ts';
import { act, renderHook } from '@testing-library/react';
import type { ChangeEvent, ReactNode, SyntheticEvent } from 'react';

function createInputChangeEvent(value: string) {
  return { target: { value } } as ChangeEvent<HTMLInputElement>;
}

function createSubmitEvent() {
  return { preventDefault: vi.fn() } as unknown as SyntheticEvent<HTMLFormElement>;
}

function createWrapper(auth: Auth) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };
}

describe('useLoginForm', () => {
  it('should initialize empty form values', () => {
    const auth: Auth = { isAuthenticated: false, login: vi.fn(), logout: vi.fn() };

    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper(auth) });

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.canSubmit).toBe(false);
  });

  it('should update email and password values', () => {
    const auth: Auth = { isAuthenticated: false, login: vi.fn(), logout: vi.fn() };

    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper(auth) });

    act(() => {
      result.current.handleEmailChange(createInputChangeEvent('admin@example.com'));
      result.current.handlePasswordChange(createInputChangeEvent('secret'));
    });

    expect(result.current.email).toBe('admin@example.com');
    expect(result.current.password).toBe('secret');
    expect(result.current.canSubmit).toBe(true);
  });

  it('should not login when submitted with invalid values', () => {
    const login = vi.fn();
    const auth: Auth = { isAuthenticated: false, login, logout: vi.fn() };

    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper(auth) });
    const event = createSubmitEvent();

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
  });

  it('should login when submitted with valid values', () => {
    const login = vi.fn();
    const auth: Auth = { isAuthenticated: false, login, logout: vi.fn() };

    const { result } = renderHook(() => useLoginForm(), { wrapper: createWrapper(auth) });
    const event = createSubmitEvent();

    act(() => {
      result.current.handleEmailChange(createInputChangeEvent('admin@example.com'));
      result.current.handlePasswordChange(createInputChangeEvent('secret'));
    });

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(login).toHaveBeenCalledTimes(1);
  });
});
