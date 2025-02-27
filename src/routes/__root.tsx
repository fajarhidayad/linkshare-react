import NotFoundPage from '@/components/not-found-page';
import { LinkContext } from '@/context/link-context';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastContainer } from 'react-toastify';
import { userApi } from '../api/user';
import { AuthContext, UserProfile } from '../context/auth-context';

interface RouterContext {
  auth: AuthContext;
  links: LinkContext;
  queryClient: QueryClient;
}

interface ProfileData {
  data: UserProfile;
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
      const profile = (await userApi.profile()) as ProfileData;
      context.auth.login(profile.data);
    } catch (err) {
      console.error(err);
      return;
    }
  },
  notFoundComponent: NotFoundPage,
});
