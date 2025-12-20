import { AuthContext } from '@/auth/contexts/AuthContext/AuthContext.tsx';
import { useAuth } from '@/auth/hooks/useAuth.ts';
import type { Auth } from '@/auth/types.ts';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { expect } from 'vitest';

describe('use auth context hook', () => {
  it('should fail if used without provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrowError('useAuth must be used within AuthProvider');
  });

  it('should return context value', () => {
    const mockAuth = {} as Auth;

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBe(mockAuth);
  });
});
