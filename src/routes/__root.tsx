import {
  createRootRouteWithContext,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/auth-context';
import { QueryClient } from '@tanstack/react-query';
import { userApi } from '../api/user';
import Button from '../components/button';

interface RouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ToastContainer />
    </>
  ),
  async beforeLoad({ context }) {
    try {
      await userApi.profile();
      context.auth.login();
    } catch (err) {
      console.error(err);
      return;
    }
  },
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-8xl font-semibold text-gray-800 mb-5">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-10">
        Page Not Found
      </h2>
      <Button onClick={() => navigate({ to: '/', replace: true })}>
        Return Home
      </Button>
    </main>
  );
}
