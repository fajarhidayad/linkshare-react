import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { LockKeyholeIcon, MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { authApi } from '../../api/auth';
import Button from '../../components/button';
import InputBox from '../../components/input-box';
import { LoginRequest, loginSchema } from '../../dto/auth.dto';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/(auth)/_auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onError(err) {
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        theme: 'colored',
      });
    },
    onSuccess() {
      navigate({
        to: '/links',
        replace: true,
      });
    },
  });

  async function onSubmitLogin(values: LoginRequest) {
    await authApi.csrfCookie();
    loginMutation.mutate(values);
  }

  return (
    <section className="bg-white rounded-lg p-10 shadow w-[476px] text-[#333]">
      <div className="mb-10">
        <h1 className="heading-m mb-2">Login</h1>
        <p className="body-m text-[#737373]">
          Add your details below to get back into the app
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="mb-6">
          <label className="body-s mb-1" htmlFor="email">
            Email address
          </label>
          <InputBox>
            <MailIcon className="mr-3 text-gray-500" size={15} />
            <input
              id="email"
              className="flex-1 focus:outline-0"
              {...register('email')}
              placeholder="e.g. user@email.com"
            />
            {formState.errors.email && (
              <TextErrorMessage>
                {formState.errors.email.message}
              </TextErrorMessage>
            )}
          </InputBox>
        </div>
        <div className="mb-6">
          <label className="body-s mb-1" htmlFor="password">
            Password
          </label>
          <InputBox>
            <LockKeyholeIcon className="mr-3 text-gray-500" size={15} />
            <input
              className="flex-1 focus:outline-0 pw-input"
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
            {formState.errors.password && (
              <TextErrorMessage>
                {formState.errors.password.message}
              </TextErrorMessage>
            )}
          </InputBox>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#633CFF] hover:bg-[#BEADFF] text-white mb-6"
        >
          Login
        </Button>
      </form>
      <p className="body-m text-center text-[#737373]">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#633CFF]">
          Create account
        </Link>
      </p>
    </section>
  );
}

function TextErrorMessage(props: { children: ReactNode }) {
  return <p className="text-red-500 text-sm">{props.children}</p>;
}
