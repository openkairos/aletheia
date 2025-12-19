import { AuthProvider } from '@/auth/contexts/AuthProvider/AuthProvider.tsx';
import { render, screen } from '@testing-library/react';

describe('AuthProvider', () => {
  it('should render children components & provide current state', () => {
    const useAuthStateMock = vi.fn();

    render(
      <AuthProvider useAuthState={useAuthStateMock}>
        <h1>Test component</h1>
      </AuthProvider>,
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test component');
    expect(useAuthStateMock).toHaveBeenCalled();
  });
});
