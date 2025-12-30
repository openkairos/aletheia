import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

test('it should render Component', () => {
  render(<Logo />);

  const logoImage = screen.getByRole('img', { name: /aletheia logo/i });

  expect(logoImage).toBeInTheDocument();
});

test('it should apply custom width and height props', () => {
  const width = 200;
  const height = 60;
  render(<Logo width={width} height={height} />);

  const logoImage = screen.getByRole('img', { name: /aletheia logo/i });

  expect(logoImage).toHaveAttribute('width', String(width));
  expect(logoImage).toHaveAttribute('height', String(height));
});
