import GetStartedImg from '@/assets/get-started-img.png';
import Button from '@/components/button';
import Dropdown from '@/components/dropdown';
import InputContainer from '@/components/input-container';
import TabHead from '@/components/tab-head';
import { PlatformLink, useLink } from '@/context/link-context';
import { createFileRoute } from '@tanstack/react-router';
import { EqualIcon, LinkIcon, PlusIcon } from 'lucide-react';
import { FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/(dashboard)/_dashboard/links')({
  component: RouteComponent,
});

function RouteComponent() {
  const { links, addLink, removeLink } = useLink();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  function onAddLink() {
    if (links.length > 4) {
      toast.error('Only 5 links per user', {
        theme: 'colored',
        hideProgressBar: true,
        position: 'bottom-center',
      });
      return;
    }
    addLink();
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 0);
  }

  function onSubmitLink(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className="h-full flex flex-col" onSubmit={onSubmitLink}>
      <TabHead
        title="Customize your links"
        description="Add/edit/remove links below and then share all your profiles with the
          world!"
      />
      <div className="px-6 md:px-10 pb-6 flex-1 flex flex-col">
        <Button
          onClick={onAddLink}
          className="w-full flex items-center justify-center space-x-1 mb-6"
          variant="secondary"
        >
          <PlusIcon size={15} />
          <span>Add new link</span>
        </Button>
        {links.length > 0 ? (
          <ul className="space-y-6 flex-1">
            {links.map((link, index) => (
              <InputLinkItem
                key={link.id}
                index={index}
                link={link}
                onDelete={removeLink}
              />
            ))}
          </ul>
        ) : (
          <EmptyLinkContent />
        )}
      </div>
      <div
        ref={bottomRef}
        className="p-6 flex md:justify-end border-t border-t-gray-300 mt-auto"
      >
        <Button className="flex-1 md:flex-initial">Save</Button>
      </div>
    </form>
  );
}

function EmptyLinkContent() {
  return (
    <div className="text-center lg:text-left bg-[#FAFAFA] p-5 rounded-xl flex-1 flex flex-col items-center justify-center">
      <img
        src={GetStartedImg}
        alt="get-started-img"
        className="h-20 lg:h-auto"
      />
      <h2 className="heading-m mb-6 text-gray-800">Let's get you started</h2>
      <p className="body-m text-center text-gray-500 max-w-[488px]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
}

function InputLinkItem(props: {
  index: number;
  link: PlatformLink;
  onDelete: (id: number) => void;
}) {
  return (
    <li key={props.link.id} className="bg-[#FAFAFA] rounded-xl p-5 space-y-3">
      <div className="text-gray-600 flex items-center justify-between">
        <p className="flex space-x-2 items-center font-bold">
          <EqualIcon size={20} /> <span>Link #{props.index + 1}</span>
        </p>
        <button
          onClick={() => props.onDelete(props.link.id)}
          className="body-m"
        >
          Remove
        </button>
      </div>
      <div className="space-y-1 text-gray-600">
        <p className="body-s">Platform</p>
        <Dropdown id={props.link.id} activePlatform={props.link} />
      </div>
      <div className="space-y-1 text-gray-600">
        <p className="body-s">Link</p>
        <InputContainer className="flex items-center bg-white space-x-3">
          <LinkIcon size={15} />
          <input className="flex-1 focus:outline-none" />
        </InputContainer>
      </div>
    </li>
  );
}
