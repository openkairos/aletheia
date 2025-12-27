import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button.tsx';

test('it should render children and default type', () => {
  render(<Button>Click me</Button>);

  const button = screen.getByRole('button', { name: /click me/i });

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});

test('it should call onClick prop when clicked', async () => {
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click Me</Button>);
  await userEvent.click(screen.getByText(/click me/i));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('it should not call onClick when button is disabled', async () => {
  const handleClick = vi.fn();

  render(
    <Button onClick={handleClick} disabled>
      Click me{' '}
    </Button>,
  );
  await userEvent.click(screen.getByRole('button'));

  expect(handleClick).not.toHaveBeenCalled();
});

test('it should render the correct button type', () => {
  const types = ['button', 'submit', 'reset'] as const;
  const randomType = types[Math.floor(Math.random() * types.length)];

  render(<Button type={randomType}>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });

  expect(button).toHaveAttribute('type', randomType);
});
