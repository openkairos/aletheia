import { createLoginRequest } from '@/auth/api/loginRequest.ts';
import { useAuth } from '@/auth/hooks/useAuth.ts';
import { createLogin } from '@/auth/login/login.ts';
import type { LoginCredentials, LoginResult } from '@/auth/login/login.types.ts';
import { createLocalStorageSessionStore } from '@/auth/session/localStorageSessionStore.ts';
import { API_BASE_PATH } from '@/config/api.ts';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

interface UseLoginFormDependencies {
  login?: (credentials: LoginCredentials) => Promise<LoginResult>;
}

const createDefaultLogin = () => {
  const sessionStore = createLocalStorageSessionStore(localStorage);

  return createLogin({
    loginRequest: createLoginRequest({ fetch, apiBasePath: API_BASE_PATH }),
    saveSession: sessionStore.write,
  });
};

export function useLoginForm(dependencies: UseLoginFormDependencies = {}) {
  const [loginAction] = useState(() => dependencies.login ?? createDefaultLogin());
  const { login: authenticate } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = email.trim() !== '' && password !== '' && !isSubmitting;

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      const result = await loginAction({ email, password });

      if (result.type === 'success') {
        authenticate();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    password,
    canSubmit,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
