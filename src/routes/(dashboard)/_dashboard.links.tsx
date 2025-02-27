import { linkApi, linkSchema, UserLink } from '@/api/link';
import GetStartedImg from '@/assets/get-started-img.png';
import Button from '@/components/button';
import DropdownInputPlatform from '@/components/dropdown-input-platform';
import InputBox from '@/components/input-box';
import TabHeader from '@/components/tab-header';
import { PlatformLink, useLink } from '@/context/link-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { EqualIcon, LinkIcon, PlusIcon } from 'lucide-react';
import { ReactNode, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface LinkData {
  data: PlatformLink[];
}

export const Route = createFileRoute('/(dashboard)/_dashboard/links')({
  component: RouteComponent,
  async loader({ context }) {
    const res = (await linkApi.get()) as LinkData;
    context.links.setLink(res.data);
    return res.data;
  },
});

function RouteComponent() {
  const router = useRouter();
  const links = Route.useLoaderData();
  const { addLink, removeLink } = useLink();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { control, handleSubmit } = useForm<UserLink>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      links,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control,
  });

  const linkMutation = useMutation({
    mutationFn: linkApi.update,
    onSuccess() {
      toast.success('Successfully updated', {
        hideProgressBar: true,
        theme: 'colored',
        position: 'bottom-center',
      });
      router.invalidate();
    },
    onError(err) {
      toast.error(err.message, {
        hideProgressBar: true,
        theme: 'colored',
        position: 'bottom-center',
      });
    },
  });

  function onAddLink() {
    if (links.length > 4 || fields.length > 4) {
      toast.error('Only 5 links per user', {
        theme: 'colored',
        hideProgressBar: true,
        position: 'bottom-center',
      });
      return;
    }
    addLink();
    append({
      name: '',
      platform: '',
      url: '',
    });
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 0);
  }

  function onRemoveLink(index: number) {
    removeLink(index);
    remove(index);
  }

  function onSubmitLink(values: UserLink) {
    linkMutation.mutate(values);
  }

  return (
    <form
      className="h-full flex flex-col"
      onSubmit={handleSubmit(onSubmitLink)}
    >
      <TabHeader
        title="Customize your links"
        description="Add/edit/remove links below and then share all your profiles with the
          world!"
      />
      <div className="px-6 md:px-10 pb-6 flex-1 flex flex-col">
        <Button
          onClick={onAddLink}
          type="button"
          className="w-full flex items-center justify-center space-x-1 mb-6"
          variant="secondary"
        >
          <PlusIcon size={15} />
          <span>Add new link</span>
        </Button>
        {fields.length > 0 ? (
          <ul className="space-y-6 flex-1">
            {fields.map((link, index) => (
              <div
                key={link.id}
                className="bg-[#FAFAFA] rounded-xl p-5 space-y-3"
              >
                <div className="text-gray-600 flex items-center justify-between">
                  <p className="flex space-x-2 items-center font-bold">
                    <EqualIcon size={20} /> <span>Link #{index + 1}</span>
                  </p>
                  <button
                    onClick={() => onRemoveLink(index)}
                    className="body-m"
                  >
                    Remove
                  </button>
                </div>
                <FormInput label="Platform">
                  <Controller
                    name={`links.${index}.platform` as const}
                    control={control}
                    render={({ field }) => (
                      <DropdownInputPlatform
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </FormInput>
                <FormInput label="Link">
                  <Controller
                    control={control}
                    name={`links.${index}.url` as const}
                    render={({ field, fieldState }) => (
                      <InputBox className="flex items-center bg-white space-x-3">
                        <LinkIcon size={15} />
                        <input
                          className="flex-1 focus:outline-none"
                          {...field}
                        />
                        {fieldState.error && (
                          <span className="text-sm text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                      </InputBox>
                    )}
                  />
                </FormInput>
              </div>
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
        <Button
          className="flex-1 md:flex-initial"
          type="submit"
          disabled={fields.length < 1}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

function FormInput(props: { children: ReactNode; label: string }) {
  return (
    <div className="space-y-1 text-gray-600">
      <p className="body-s">{props.label}</p>
      {props.children}
    </div>
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
