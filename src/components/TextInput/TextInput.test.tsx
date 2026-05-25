import { TextInput } from '@/components/TextInput/TextInput.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('it renders an accessible textbox by label', () => {
  render(<TextInput label='Email' name='email' />);

  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
});

test('it applies input attributes', () => {
  render(<TextInput label='Email' name='email' type='email' autoComplete='email' />);

  const input = screen.getByRole('textbox', { name: /email/i });

  expect(input).toHaveAttribute('name', 'email');
  expect(input).toHaveAttribute('type', 'email');
  expect(input).toHaveAttribute('autocomplete', 'email');
});

test('it calls onChange when the input changes', async () => {
  const handleChange = vi.fn();

  render(<TextInput label='Email' name='email' onChange={handleChange} />);

  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'user@example.com');

  expect(handleChange).toHaveBeenCalled();
});

test('it respects disabled', async () => {
  const handleChange = vi.fn();

  render(<TextInput label='Email' name='email' onChange={handleChange} disabled />);

  const input = screen.getByRole('textbox', { name: /email/i });
  expect(input).toBeDisabled();

  await userEvent.type(input, 'user@example.com');

  expect(handleChange).not.toHaveBeenCalled();
});
