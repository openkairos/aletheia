import type { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  disabled?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const commonClasses = `
  h-10 
  px-4 
  py-2 
  text-sm 
  inline-flex items-center 
  justify-center 
  gap-2 
  whitespace-nowrap 
  rounded-md 
  font-medium 
  transition-colors
  w-full
  focus-visible:outline-none
  focus-visible:ring-2 
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50 
  hover:cursor-pointer
  `;

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
};

export function Button({ children, onClick, disabled, type = 'button', variant = 'primary' }: ButtonProps) {
  const classNames = `${commonClasses} ${variants[variant]}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames}>
      {children}
    </button>
  );
}
