import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { authApi } from '../../api/auth';
import { userApi } from '../../api/user';

export const Route = createFileRoute('/(dashboard)/_dashboard')({
  component: RouteComponent,
  async beforeLoad({ context }) {
    try {
      await userApi.profile();
      context.auth.login();
    } catch (err) {
      console.error(err);
      throw redirect({
        to: '/login',
        throw: true,
      });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess() {
      navigate({
        to: '/',
        replace: true,
      });
    },
  });

  async function onLogout() {
    await authApi.csrfCookie();
    logoutMutation.mutate();
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <nav className="p-6">
        <div className="bg-white rounded-xl flex justify-between items-center p-4">
          <h2 className="text-xl font-bold text-slate-700">Share Link Gan</h2>
          <div className="flex items-center gap-x-4">
            <Link
              to="/links"
              className="flex items-center rounded-lg px-7 py-3 bg-[#EFEBFF] heading-s"
            >
              Links
            </Link>
            <Link
              to="/profile"
              className="flex items-center rounded-lg px-7 py-3 bg-[#EFEBFF] heading-s"
            >
              Profile Details
            </Link>
          </div>
          <Link
            to="/"
            className="flex items-center rounded-lg px-7 py-3 bg-transparent border border-[#633CFF] text-[#633CFF] heading-s"
          >
            Preview
          </Link>
        </div>
      </nav>
      <main className="px-6 pb-6 flex-1 flex gap-x-6">
        <section className="bg-white flex items-center justify-center w-2/5 rounded-xl"></section>
        <section className="bg-white flex-1 rounded-xl p-10 flex flex-col">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
