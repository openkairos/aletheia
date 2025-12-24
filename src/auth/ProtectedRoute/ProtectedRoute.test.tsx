import type { AuthContext } from '@/auth';
import { ProtectedRoute } from '@/auth/ProtectedRoute/ProtectedRoute.tsx';
import { render, screen } from '@testing-library/react';
import { Navigate } from 'react-router';

describe('Protected route component', () => {
  test('it should render children elements if user is authenticated', async () => {
    const useAuthMock = () => ({ isAuthenticated: true });

    render(
      <ProtectedRoute useAuth={useAuthMock as unknown as AuthContext}>
        <h1>Test</h1>
      </ProtectedRoute>,
    );

    const children = await screen.findByRole('heading');

    expect(children).toHaveTextContent('Test');
  });

  test('it should redirect to login if not authenticated', async () => {
    const NavigateMock = ({ to }: { to: string }) => {
      return <h1>Redirecting to {to}</h1>;
    };
    const useAuthMock = () => ({ isAuthenticated: false });

    render(
      <ProtectedRoute
        Navigate={NavigateMock as unknown as typeof Navigate}
        useAuth={useAuthMock as unknown as AuthContext}
      >
        <h1>Test</h1>
      </ProtectedRoute>,
    );

    const redirectMessage = await screen.findByRole('heading');
    expect(redirectMessage).toHaveTextContent('Redirecting to /auth/login');
    expect(screen.queryByText('Test')).toBeNull();
  });
});
