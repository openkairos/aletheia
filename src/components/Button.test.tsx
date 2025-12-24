import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button.tsx';
it('render with children text', () => {
  const buttonText = 'Click me';
  render(<Button>{buttonText}</Button>);

  expect(screen.getByText(buttonText)).toBeInTheDocument();
});
