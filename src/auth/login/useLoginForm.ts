import { useAuth } from '@/auth/auth-state/useAuth.ts';
import { createLogin } from '@/auth/login/login.ts';
import { createLoginRequest } from '@/auth/login/loginRequest.ts';
import type { LoginCredentials, LoginResult } from '@/auth/login/login.types.ts';
import { createLocalStorageSessionStore } from '@/auth/session/localStorageSessionStore.ts';
import { API_BASE_PATH } from '@/config/api.ts';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';

interface UseLoginFormDependencies {
  login?: (credentials: LoginCredentials) => Promise<LoginResult>;
  navigate?: (to: string) => void;
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
  const routerNavigate = useNavigate();
  const navigate = dependencies.navigate ?? routerNavigate;
  const { authenticate } = useAuth();
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
        navigate('/');
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
