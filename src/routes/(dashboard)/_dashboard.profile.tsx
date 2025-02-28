import { userApi } from '@/api/user';
import { useAuth, UserProfile } from '@/context/auth-context';
import { UpdateProfileDto, updateProfileSchema } from '@/dto/profile.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ImageIcon } from 'lucide-react';
import { ComponentProps, forwardRef, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import Button from '../../components/button';
import InputBox from '../../components/input-box';
import TabHead from '../../components/tab-header';

interface ProfileData {
  data: UserProfile;
}

export const Route = createFileRoute('/(dashboard)/_dashboard/profile')({
  component: RouteComponent,
  async loader({ context }) {
    const profile = (await userApi.profile()) as ProfileData;
    context.auth.login(profile.data);
  },
});

function RouteComponent() {
  const router = useRouter();

  const { profile } = useAuth();
  const { control, handleSubmit } = useForm<UpdateProfileDto>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile?.username,
      firstName: profile?.first_name,
      lastName: profile?.last_name,
      email: profile?.email,
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(() => {
    if (profile && profile.profile_picture_url) {
      return import.meta.env.VITE_IMAGE_BASE_URL + profile.profile_picture_url;
    }
    return null;
  });
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const profileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess() {
      toast.success('Sucessfully updated', {
        hideProgressBar: true,
        position: 'bottom-center',
        theme: 'colored',
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmitProfile(values: UpdateProfileDto) {
    const fileSize =
      (imageInputRef.current?.files && imageInputRef.current?.files?.length > 0
        ? imageInputRef.current?.files?.[0].size
        : null) ?? 0;
    if (fileSize > 1024000) {
      toast.error('Image size too big', {
        hideProgressBar: true,
        position: 'bottom-center',
        theme: 'colored',
      });
      return;
    }
    profileMutation.mutate({
      ...values,
      profilePicture: imageInputRef.current?.files?.[0],
    });
  }

  return (
    <form
      className="flex flex-col h-full"
      onSubmit={handleSubmit(onSubmitProfile)}
    >
      <TabHead
        title="Profile Details"
        description=" Add your details to create a personal touch to your profile."
      />

      <BGContainer className="mx-6 md:mx-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:items-center">
        <p className="body-m text-gray-500 lg:w-1/3 flex-shrink-0">
          Profile picture
        </p>
        <div className="flex-shrink-0 mr-6">
          <label
            htmlFor="image"
            className="relative cursor-pointer flex flex-col items-center justify-center text-primary heading-s bg-primary-disabled size-48 rounded-xl overflow-hidden"
          >
            {selectedImage ? (
              <>
                <img
                  src={selectedImage as string}
                  alt="profile-picture-preview"
                  className="bg-cover"
                />
                <div className="group text-white z-20 flex flex-col hover:backdrop-blur-sm items-center w-full h-full bg-black/0 justify-center transition duration-150 ease-in-out hover:bg-black/50 absolute top-0">
                  <ImageIcon
                    size={30}
                    className="group-hover:opacity-100 opacity-0 transition duration-150 mb-2"
                  />
                  <p className="group-hover:opacity-100 opacity-0 transition duration-150">
                    Change Image
                  </p>
                </div>
              </>
            ) : (
              <>
                <ImageIcon className="mb-2" />
                <span>Upload Image</span>
              </>
            )}
          </label>
          <input
            ref={imageInputRef}
            id="image"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            className="hidden"
          />
        </div>
        <p className="body-s text-gray-500 flex-shrink-1">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </BGContainer>
      <BGContainer className="mx-6 md:mx-10 space-y-3">
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <FormInput
              id="username"
              title="Username"
              placeholder="e.g. wicked"
              required
              errorMessage={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormInput
              id="firstName"
              title="First name"
              placeholder="e.g. John"
              required
              errorMessage={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormInput
              id="lastName"
              title="Last name"
              placeholder="e.g. Wick"
              required
              errorMessage={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormInput
              id="email"
              title="Email"
              type="email"
              placeholder="e.g. johnwick@email.com"
              errorMessage={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </BGContainer>

      <div className="py-4 flex justify-end border-t border-t-gray-300 px-6 mt-auto">
        <Button className="flex-1 md:flex-0">Save</Button>
      </div>
    </form>
  );
}

interface FormInputProps extends ComponentProps<'input'> {
  id: string;
  title: string;
  placeholder: string;
  errorMessage?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label htmlFor={props.id} className="w-1/3 text-gray-500 w- mb-1 md:mb-0">
        {props.title}
        {props.required && <sup className="text-red-500">*</sup>}
      </label>
      <InputBox className="relative bg-white flex-1">
        <input
          ref={ref}
          className="bg-transparent focus:outline-0 w-full"
          required={props.required}
          {...props}
        />
        {props.errorMessage && (
          <span className="absolute right-5 text-red-500 text-sm">
            {props.errorMessage}
          </span>
        )}
      </InputBox>
    </div>
  );
});

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
