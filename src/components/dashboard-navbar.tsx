import { useAuth } from '@/context/auth-context';
import { createLink, LinkComponent, useNavigate } from '@tanstack/react-router';
import Logo from './logo';
import { forwardRef } from 'react';
import { CircleUserRoundIcon, EyeIcon, LinkIcon } from 'lucide-react';
import Button from './button';

export default function DashboardNavbar() {
  const { profile } = useAuth();
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
        {profile?.username && (
          <Button
            variant="secondary"
            onClick={() =>
              navigate({
                to: '/$username',
                params: { username: profile?.username },
              })
            }
          >
            <EyeIcon size={15} className="block md:hidden" />
            <span className="hidden md:block">Preview</span>
          </Button>
        )}
      </div>
    </nav>
  );
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement>((props, ref) => {
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
