import { createFileRoute, Link } from '@tanstack/react-router';
import InputContainer from '../../components/input-container';
import { LockKeyholeIcon, MailIcon } from 'lucide-react';
import Button from '../../components/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/(auth)/_auth/register')({
  component: RegisterPage,
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'min 8 char' }),
  confirmPassword: z.string().min(8, { message: 'min 8 char' }),
});

type RegisterReq = z.infer<typeof registerSchema>;

function RegisterPage() {
  const { register, handleSubmit, formState } = useForm<RegisterReq>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onError(error) {
      console.error(error);
      toast.error(error.message, {
        hideProgressBar: true,
        autoClose: 5000,
        theme: 'colored',
        position: 'top-right',
      });
    },
  });

  function onSubmitRegister(values: RegisterReq) {
    registerMutation.mutate(values);
  }

  return (
    <section className="bg-white rounded-lg p-10 shadow w-[476px] text-[#333]">
      <div className="mb-10">
        <h1 className="heading-m mb-2">Create account</h1>
        <p className="body-m text-[#737373]">
          Let’s get you started sharing your links!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <div className="mb-6">
          <label className="body-s mb-1" htmlFor="email">
            Email address
          </label>
          <InputContainer>
            <MailIcon className="mr-3 text-gray-500" size={15} />
            <input
              id="email"
              className="flex-1 focus:outline-0"
              {...register('email')}
              placeholder="e.g. user@email.com"
            />
            {formState.errors.email && (
              <p className="text-red-500 text-sm">
                {formState.errors.email.message}
              </p>
            )}
          </InputContainer>
        </div>
        <div className="mb-6">
          <label className="body-s mb-1" htmlFor="password">
            Create password
          </label>
          <InputContainer>
            <LockKeyholeIcon className="mr-3 text-gray-500" size={15} />
            <input
              className="flex-1 focus:outline-0 tracking-widest"
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
            {formState.errors.password && (
              <p className="text-red-500 text-sm">
                {formState.errors.password.message}
              </p>
            )}
          </InputContainer>
        </div>
        <div className="mb-6">
          <label className="body-s mb-1" htmlFor="confirmPassword">
            Confirm password
          </label>
          <InputContainer>
            <LockKeyholeIcon className="mr-3 text-gray-500" size={15} />
            <input
              className="flex-1 focus:outline-0"
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm your password"
            />
            {formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formState.errors.confirmPassword.message}
              </p>
            )}
          </InputContainer>
        </div>
        <p className="body-s mb-6 text-gray-500">
          Password must contain at least 8 characters
        </p>
        <Button
          type="submit"
          className="w-full bg-[#633CFF] hover:bg-[#BEADFF] text-white mb-6"
        >
          Create new account
        </Button>
      </form>
      <p className="body-m text-center text-[#737373]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#633CFF]">
          Login
        </Link>
      </p>
    </section>
  );
}
