import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button.tsx';

test('render with children text', () => {
  const buttonText = 'Click me';
  render(<Button>{buttonText}</Button>);

  expect(screen.getByText(buttonText)).toBeInTheDocument();
});

test('should call onClick prop when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  await userEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('should not call onClick when button is disabled', async () => {
  const handleClick = vi.fn();
  render(
    <Button onClick={handleClick} disabled>
      Click me{' '}
    </Button>,
  );

  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).not.toHaveBeenCalled();
});

test('should have type="button"', () => {
  render(<Button>Click me</Button>);

  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});

test('should have type="submit"', () => {
  render(<Button type={'submit'}>Click me</Button>);

  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
});

test('should have type="reset"', () => {
  render(<Button type={'reset'}>Click me</Button>);

  expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
});
