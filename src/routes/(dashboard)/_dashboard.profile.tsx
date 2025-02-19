import { createFileRoute } from '@tanstack/react-router';
import TabHead from '../../components/tab-head';
import { ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import InputContainer from '../../components/input-container';
import Button from '../../components/button';

export const Route = createFileRoute('/(dashboard)/_dashboard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="flex flex-col h-full">
      <TabHead
        title="Profile Details"
        description=" Add your details to create a personal touch to your profile."
      />

      <BGContainer className="mx-6 md:mx-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:items-center">
        <p className="body-m text-gray-500 w-1/3 mr-auto flex-shrink-0">
          Profile picture
        </p>
        <button className="flex flex-col items-center justify-center text-primary heading-s mr-6 bg-primary-disabled py-14 px-10 rounded-xl flex-shrink-0">
          <ImageIcon className="mb-2" />
          <span>Upload Image</span>
        </button>
        <p className="body-s text-gray-500 flex-shrink-1">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </BGContainer>
      <BGContainer className="mx-6 md:mx-10 space-y-3">
        <FormInput
          id="firstName"
          title="First name"
          placeholder="e.g. John"
          required
        />
        <FormInput
          id="lastName"
          title="Last name"
          placeholder="e.g. Wick"
          required
        />
        <FormInput
          id="email"
          title="Email"
          placeholder="e.g. johnwick@email.com"
        />
      </BGContainer>

      <div className="py-4 flex justify-end border-t border-t-gray-300 px-6 mt-auto">
        <Button className="flex-1 md:flex-0">Save</Button>
      </div>
    </form>
  );
}

const FormInput = (props: {
  id: string;
  title: string;
  required?: boolean;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label htmlFor={props.id} className="w-1/3 text-gray-500 w- mb-1 md:mb-0">
        {props.title}
        {props.required && <sup className="text-red-500">*</sup>}
      </label>
      <InputContainer className="bg-white flex-1">
        <input
          id={props.id}
          className="bg-transparent focus:outline-0"
          placeholder={props.placeholder}
          required={props.required}
        />
      </InputContainer>
    </div>
  );
};

const BGContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge('bg-gray-50 rounded-xl p-5 mb-6', props.className)}>
      {props.children}
    </div>
  );
};
