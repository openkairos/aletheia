interface ButtonProps {
  variant?: 'primary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const commonClasses =
    'font-semibold rounded-lg focus:outline-none transition-colors duration-200 ' +
    'focus-visible:ring-2 focus-visible:ring-offset-2';

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const variantClasses = {
    primary:
      'text-white bg-[var(--color-primary-default)] hover:bg-[var(--color-primary-hover)] focus:ring-[#FF343A] active:bg-[var(--color-primary-active)] disabled:bg-[var(--color-primary-disabled)] ',
  };

  const buttonClasses = `${commonClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button type={type} onClick={disabled ? undefined : onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
}
