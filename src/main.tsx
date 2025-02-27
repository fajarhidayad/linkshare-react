import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

import { routeTree } from './routeTree.gen';
import { AuthProvider, useAuth } from './context/auth-context';
import { LinkProvider, useLink } from './context/link-context';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const auth = useAuth();
  const links = useLink();

  return <RouterProvider router={router} context={{ auth, links }} />;
};

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LinkProvider>
            <App />
          </LinkProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
