import { forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputContainerProps {
  children: ReactNode;
  isError?: boolean;
  className?: string;
}

const InputContainer = forwardRef<HTMLDivElement, InputContainerProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'flex items-center border border-gray-300 rounded-lg py-3 px-4 mb-1 focus-within:border-[#633CFF] focus-within:shadow-[0_0_16px_rgba(0,0,0,0.05)] focus-within:shadow-[#633cff5d]',
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }
);

export default InputContainer;
