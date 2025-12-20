import type { Auth } from '@/auth/types.ts';
import { createContext } from 'react';

export const AuthContext = createContext<Auth | undefined>(undefined);
