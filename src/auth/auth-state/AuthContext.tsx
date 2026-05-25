import type { Auth } from '@/auth/auth-state/authContext.types.ts';
import { createContext } from 'react';

export const AuthContext = createContext<Auth | undefined>(undefined);
