import type { ReactNode } from 'react';

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ disabled = false, children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className='w-full py-2 px-4 text-base text-white font-semibold rounded-lg focus:outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 bg-brand hover:bg-brand-dark focus:ring-brand active:bg-brand-darker disabled:bg-brand-muted'
    >
      {children}
    </button>
  );
}
