import type { Auth } from '@/auth/contexts/AuthContext/authContext.types.ts';
import { createContext } from 'react';

export const AuthContext = createContext<Auth | undefined>(undefined);
