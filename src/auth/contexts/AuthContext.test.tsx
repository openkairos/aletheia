import AuthContext from '@/auth/contexts/AuthContext.tsx';
import type { Auth } from '@/auth/contexts/types.ts';
import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

describe('Auth context', () => {
  it('should provide undefined when used outside provider', () => {
    const { result } = renderHook(() => useContext(AuthContext));

    expect(result.current).toBeUndefined();
  });

  it('should provide current provider value', () => {
    const value: Auth = {
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
    };

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: props => <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>,
    });

    expect(result.current).toBe(value);
  });
});
