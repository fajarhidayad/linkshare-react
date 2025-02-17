import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { userApi } from '../../api/user';
import LogoImg from '../../assets/devlinks-logo.png';

export const Route = createFileRoute('/(auth)/_auth')({
  component: AuthLayout,
  async beforeLoad({ context }) {
    let isAuth = false;

    try {
      await userApi.profile();
      context.auth.login();
      isAuth = true;
    } catch (err) {
      console.error(err);
      return;
    }

    if (isAuth) {
      throw redirect({
        to: '/links',
        throw: true,
      });
    }
  },
});

function AuthLayout() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="flex items-center mb-14 space-x-2.5">
        <img src={LogoImg} alt="logo" />
        <h2 className="heading-m font-bold">devlinks</h2>
      </div>
      <Outlet />
    </main>
  );
}
