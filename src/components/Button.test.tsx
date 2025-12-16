import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ButtonComponent } from './Button.tsx';

describe('Button Component', () => {
  it('should render the button with the correct label', () => {
    const handleClick = vi.fn();
    render(<ButtonComponent label='Click Me' onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click Me/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<ButtonComponent label='Test Click' onClick={handleClick} />);
    const buttonElement = screen.getByText(/Test Click/i);
    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
