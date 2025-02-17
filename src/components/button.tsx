import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const baseStyles =
  'py-3 rounded-lg hover:cursor-pointer transition-all duration-200 heading-s text-white px-5 disabled:opacity-50 disabled:cursor-not-allowed';
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primary-active',
  secondary:
    'bg-transparent border border-primary text-primary active:bg-primary-disabled',
};

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(baseStyles, variantStyles[variant], props.className)
      )}
    >
      {props.children}
    </button>
  );
}
