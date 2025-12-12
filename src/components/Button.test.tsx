import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';


describe('Button Component', () => {
  it('should render the button with the correct label', () => {

    const handleClick = vi.fn(); 
    
  
    render(<Button label="Click Me" onClick={handleClick} />);
    

    const buttonElement = screen.getByText(/Click Me/i);
    

    expect(buttonElement).toBeInTheDocument();
  });
  
  it('should call the onClick handler when clicked', () => {

    const handleClick = vi.fn(); 
    

    render(<Button label="Test Click" onClick={handleClick} />);
    

    const buttonElement = screen.getByText(/Test Click/i);
    

    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});