import DashboardNavbar from '@/components/dashboard-navbar';
import { useAuth, UserProfile } from '@/context/auth-context';
import { useLink } from '@/context/link-context';
import { imageUrl } from '@/utils/imageUrl';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import clsx from 'clsx';
import { ArrowRightIcon } from 'lucide-react';
import { userApi } from '../../api/user';

interface ProfileData {
  data: UserProfile;
}

export const Route = createFileRoute('/(dashboard)/_dashboard')({
  component: RouteComponent,
  async beforeLoad() {
    try {
      (await userApi.profile()) as ProfileData;
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
  const { profile } = useAuth();
  const { links } = useLink();
  // const navigate = useNavigate();

  // const logoutMutation = useMutation({
  //   mutationFn: authApi.logout,
  //   onSuccess() {
  //     navigate({
  //       to: '/',
  //       replace: true,
  //     });
  //   },
  // });

  // async function onLogout() {
  //   await authApi.csrfCookie();
  //   logoutMutation.mutate();
  // }

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <DashboardNavbar />

      <main className="p-4 md:px-6 md:pb-6 flex-1 flex gap-x-0 md:gap-x-6">
        <section className="self-start py-20 sticky top-0 hidden bg-white lg:flex items-center justify-center w-2/5 rounded-xl">
          <div className="w-xs rounded-[50px] h-[630px] border border-gray-500 p-3">
            <div className="w-full h-full border border-gray-500 rounded-[40px] flex flex-col items-center p-2">
              <div className="border border-gray-500 rounded-full p-3 w-24 mb-6" />
              <div className="flex flex-col items-center self-stretch px-4">
                <div
                  className={clsx(
                    'rounded-full size-24 bg-gray-100 mb-6 overflow-hidden',
                    {
                      'border-4 border-primary': profile?.profile_picture_url
                        ? true
                        : false,
                    }
                  )}
                >
                  {profile?.profile_picture_url && (
                    <img
                      src={imageUrl(profile.profile_picture_url)}
                      alt="profile picture"
                    />
                  )}
                </div>
                {profile?.first_name && profile.last_name ? (
                  <h3 className="font-semibold text-lg mb-2">
                    {profile.first_name} {profile.last_name}
                  </h3>
                ) : (
                  <div className="bg-gray-100 rounded-full w-[60%] h-6 mb-3"></div>
                )}
                {profile?.email ? (
                  <p className="mb-10 text-gray-500 text-sm">{profile.email}</p>
                ) : (
                  <div className="bg-gray-100 rounded-full w-[40%] h-3 mb-10" />
                )}

                <ul className="flex flex-col space-y-5 self-stretch">
                  {links.map((link) => (
                    <li
                      key={link.id}
                      className="flex items-center rounded-lg w-full px-4 py-3 text-white h-11 bg-primary"
                      // style={{ backgroundColor: link.color }}
                    >
                      {/* {link.label && <link.icon size={16} className="mr-2" />} */}
                      <p className="body-s">{link.platform}</p>
                      {link.platform && <ArrowRightIcon className="ml-auto" />}
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
