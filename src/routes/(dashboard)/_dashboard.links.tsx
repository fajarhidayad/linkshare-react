import { createFileRoute } from '@tanstack/react-router';
import Button from '../../components/button';
import { PlusIcon } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/_dashboard/links')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="mb-10">
        <h1 className="heading-m mb-2">Customize your links</h1>
        <p className="body-m text-gray-500">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <button className="w-full flex items-center heading-s justify-center rounded-lg py-3 border border-[#633CFF] text-[#633CFF] mb-6 hover:cursor-pointer hover:bg-purple-100 transition-colors duration-200">
        <PlusIcon size={15} />
        Add new link
      </button>
      <div className="bg-[#FAFAFA] p-5 rounded-xl flex-1 flex flex-col items-center justify-center">
        <h2 className="heading-m mb-6 text-gray-800">Let's get you started</h2>
        <p className="body-m text-center text-gray-500 max-w-[488px]">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
      <div className="p-6 flex justify-end">
        <Button className="bg-[#633CFF] px-7 text-white">Save</Button>
      </div>
    </>
  );
}
