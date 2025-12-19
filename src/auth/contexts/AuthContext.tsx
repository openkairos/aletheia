import type { Auth } from '@/auth/contexts/types.ts';
import { createContext } from 'react';

const AuthContext = createContext<Auth | undefined>(undefined);

export default AuthContext;
