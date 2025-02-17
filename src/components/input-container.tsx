import { ReactNode } from 'react';

interface InputContainerProps {
  children: ReactNode;
  isError?: boolean;
}

export default function InputContainer(props: InputContainerProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg py-3 px-4 mb-1 focus-within:border-[#633CFF] focus-within:shadow-[0_0_16px_rgba(0,0,0,0.05)] focus-within:shadow-[#633cff5d]">
      {props.children}
    </div>
  );
}
