import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'className'> {
  label: string;
}

export function TextInput({ label, ...inputProps }: TextInputProps) {
  return (
    <label className='block'>
      <span className='block text-sm font-semibold text-gray-900 mb-2'>{label}</span>
      <input
        {...inputProps}
        className='h-10 w-full rounded-md border border-gray-300 px-4 text-sm text-gray-900 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20'
      />
    </label>
  );
}
