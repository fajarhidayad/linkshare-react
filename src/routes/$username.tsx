import { useLink } from '@/context/link-context';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowRightIcon, LinkIcon } from 'lucide-react';
import Button from '../components/button';
import { useAuth, UserProfile } from '../context/auth-context';
import { toast } from 'react-toastify';
import { userApi } from '@/api/user';
import { imageUrl } from '@/utils/imageUrl';

interface ProfileData {
  data: {
    user: UserProfile;
  };
}

export const Route = createFileRoute('/$username')({
  component: PreviewPage,
  async loader({ params }) {
    try {
      const res = (await userApi.publicProfile(params.username)) as ProfileData;
      return res.data;
    } catch (error) {
      console.log(error);
      return;
    }
  },
});

function PreviewPage() {
  const profile = Route.useLoaderData();

  const navigate = useNavigate();
  const auth = useAuth();
  const { links } = useLink();

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    toast(
      <div className="text-gray-100 flex items-center space-x-3">
        <LinkIcon size={16} className="text-gray-400" />
        <p>The link has been copied to your clipboard!</p>
      </div>,
      {
        hideProgressBar: true,
        theme: 'dark',
        position: 'bottom-center',
        className: 'bg-gray-950 rounded-xl',
      }
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="hidden md:block absolute w-screen rounded-b-4xl bg-primary h-[35vh] top-0 -z-0" />
      {auth.isAuthenticated && <div className="py-7" />}
      {auth.isAuthenticated && (
        <nav className="absolute top-0 sm:p-6 w-full z-10">
          <div className="bg-transparent sm:bg-white py-4 px-6 rounded-xl flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => navigate({ to: '/links' })}
            >
              Back to Editor
            </Button>
            <Button onClick={copyLinkToClipboard}>Share Link</Button>
          </div>
        </nav>
      )}

      <section className="w-full bg-transparent sm:bg-white sm:shadow-xl rounded-3xl py-12 px-12 sm:px-14 sm:w-sm">
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="border-4 border-primary size-24 rounded-full bg-gray-100 mb-6 overflow-hidden">
            {profile?.user.profile_picture_url && (
              <img
                src={imageUrl(profile?.user.profile_picture_url)}
                alt="profile picture"
              />
            )}
          </div>
          <h2 className="heading-m text-gray-800 mb-2">
            {profile?.user.first_name} {profile?.user.last_name}
          </h2>
          <p className="body-m text-gray-500">{profile?.user.email}</p>
        </div>

        <div className="space-y-5">
          {links.map((link) => (
            <button
              key={link.id}
              className="p-4 text-white body-m flex items-center rounded-lg w-full hover:cursor-pointer hover:scale-105 transition duration-150"
              style={{ backgroundColor: link.color }}
            >
              <link.icon size={16} />
              <p className="ml-3 mr-auto">{link.label}</p>
              <ArrowRightIcon />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
