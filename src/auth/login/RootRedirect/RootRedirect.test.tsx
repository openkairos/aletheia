import type { AuthContext } from '@/auth';
import { RootRedirect } from '@/auth/login/RootRedirect/RootRedirect.tsx';
import { render } from '@testing-library/react';
import { MemoryRouter, type Navigate } from 'react-router';

describe('Root redirect component', () => {
  const NavigateMock = ({ to }: { to: string }) => <div>Redirecting to {to}</div>;

  it('should redirect visitors to login page', () => {
    const authContextMock = () => ({ isAuthenticated: false });

    const { container } = render(
      <MemoryRouter>
        <RootRedirect
          useAuth={authContextMock as unknown as AuthContext}
          Navigate={NavigateMock as unknown as typeof Navigate}
        />
      </MemoryRouter>,
    );

    expect(container.textContent).toBe('Redirecting to /auth/login');
  });

  it('should not redirect users', () => {
    const authContextMock = () => ({ isAuthenticated: true });

    const { container } = render(
      <MemoryRouter>
        <RootRedirect
          useAuth={authContextMock as unknown as AuthContext}
          Navigate={NavigateMock as unknown as typeof Navigate}
        />
      </MemoryRouter>,
    );

    expect(container.textContent).not.toBe('Redirecting to /auth/login');
  });
});
