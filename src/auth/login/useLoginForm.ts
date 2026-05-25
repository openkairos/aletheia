import { useAuth } from '@/auth';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

export function useLoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = email.trim() !== '' && password !== '';

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) return;

    login();
  }

  return {
    email,
    password,
    canSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
