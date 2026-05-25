import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import type { Auth } from '@/auth/contexts/AuthContext/authContext.types.ts';
import { useLoginForm } from '@/auth/login/useLoginForm.ts';
import type { LoginCredentials, LoginResult } from '@/auth/login/login.types.ts';
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
  const successResult: LoginResult = {
    type: 'success',
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

  const validationErrorResult: LoginResult = {
    type: 'validation-error',
    errors: { password: ['This value should not be blank.'] },
  };

  function createLogin(result: LoginResult) {
    return vi.fn<(credentials: LoginCredentials) => Promise<LoginResult>>().mockResolvedValue(result);
  }

  function renderLoginForm({
    loginResult = successResult,
    authenticate = vi.fn(),
    navigate = vi.fn(),
  }: { loginResult?: LoginResult; authenticate?: Auth['login']; navigate?: (to: string) => void } = {}) {
    const login = createLogin(loginResult);
    const auth: Auth = { isAuthenticated: false, login: authenticate, logout: vi.fn() };

    return {
      ...renderHook(() => useLoginForm({ login, navigate }), {
        wrapper: createWrapper(auth),
      }),
      authenticate,
      login,
      navigate,
    };
  }

  function fillValidCredentials(result: ReturnType<typeof renderLoginForm>['result']) {
    act(() => {
      result.current.handleEmailChange(createInputChangeEvent('admin@example.com'));
      result.current.handlePasswordChange(createInputChangeEvent('secret'));
    });
  }

  it('should initialize empty form values', () => {
    const { result } = renderLoginForm();

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.canSubmit).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update email and password values', () => {
    const { result } = renderLoginForm();

    fillValidCredentials(result);

    expect(result.current.email).toBe('admin@example.com');
    expect(result.current.password).toBe('secret');
    expect(result.current.canSubmit).toBe(true);
  });

  it('should not login when submitted with invalid values', () => {
    const { result, login, authenticate, navigate } = renderLoginForm();
    const event = createSubmitEvent();

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
    expect(authenticate).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should submit credentials and authenticate when login succeeds', async () => {
    const { result, login, authenticate, navigate } = renderLoginForm();
    const event = createSubmitEvent();

    fillValidCredentials(result);

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith({ email: 'admin@example.com', password: 'secret' });
    expect(authenticate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should not authenticate when login fails', async () => {
    const { result, login, authenticate, navigate } = renderLoginForm({ loginResult: validationErrorResult });
    const event = createSubmitEvent();

    fillValidCredentials(result);

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(login).toHaveBeenCalledWith({ email: 'admin@example.com', password: 'secret' });
    expect(authenticate).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });
});
