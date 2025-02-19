import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  createLink,
  Link,
  LinkComponent,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { authApi } from '../../api/auth';
import { userApi } from '../../api/user';
import Logo from '../../components/logo';
import {
  ArrowRightIcon,
  CircleUserRoundIcon,
  EyeIcon,
  LinkIcon,
} from 'lucide-react';
import React from 'react';
import Button from '../../components/button';
import { useLink } from '@/context/link-context';

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
  const { links } = useLink();
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
      <Navbar />

      <main className="p-4 md:px-6 md:pb-6 flex-1 flex gap-x-0 md:gap-x-6">
        <section className="self-start py-20 sticky top-0 hidden bg-white lg:flex items-center justify-center w-2/5 rounded-xl">
          <div className="w-xs rounded-[50px] h-[630px] border border-gray-500 p-3">
            <div className="w-full h-full border border-gray-500 rounded-[40px] flex flex-col items-center p-2">
              <div className="border border-gray-500 rounded-full p-3 w-24 mb-6" />
              <div className="flex flex-col items-center self-stretch px-4">
                <div className="rounded-full size-24 bg-gray-100 mb-6"></div>
                <h2 className="bg-gray-100 rounded-full w-[60%] h-6 mb-3"></h2>
                <p className="bg-gray-100 rounded-full w-[40%] h-3 mb-14"></p>

                <ul className="flex flex-col space-y-5 self-stretch">
                  {links.map((link) => (
                    <li
                      key={link.id}
                      className="flex items-center rounded-lg w-full px-4 py-3 text-white h-11"
                      style={{ backgroundColor: link.color }}
                    >
                      {link.label && <link.icon size={16} className="mr-2" />}
                      <p className="body-s">{link.label}</p>
                      {link.label && <ArrowRightIcon className="ml-auto" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white flex-1 rounded-xl">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="p-0 md:p-6">
      <div className="bg-white rounded-xl flex justify-between items-center p-4">
        <Logo />
        <div className="flex items-center md:gap-x-4">
          <NavLink to="/links">
            <LinkIcon size={15} />
            <span className="hidden md:block">Links</span>
          </NavLink>
          <NavLink to="/profile">
            <CircleUserRoundIcon size={15} />
            <span className="hidden md:block">Profile Details</span>
          </NavLink>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            navigate({ to: '/$username', params: { username: 'halo' } })
          }
        >
          <EyeIcon size={15} className="block md:hidden" />
          <span className="hidden md:block">Preview</span>
        </Button>
      </div>
    </nav>
  );
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement>((props, ref) => {
  return <a ref={ref} {...props} />;
});

const NavLinkComponent = createLink(BasicLinkComponent);

const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <NavLinkComponent
      preload="intent"
      activeProps={{
        className: 'bg-[#EFEBFF] text-primary',
      }}
      inactiveProps={{
        className: 'bg-transparent text-gray-500',
      }}
      className="flex items-center rounded-lg px-7 py-3 heading-s md:space-x-2.5 hover:text-primary transition duration-200"
      {...props}
    />
  );
};
