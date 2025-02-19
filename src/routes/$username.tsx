import { useLink } from '@/context/link-context';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import Button from '../components/button';
import { useAuth } from '../context/auth-context';

export const Route = createFileRoute('/$username')({
  component: PreviewPage,
});

function PreviewPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { links } = useLink();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="hidden md:block absolute w-screen rounded-b-4xl bg-primary h-[30vh] top-0 -z-0" />
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
            <Button onClick={() => navigate({ to: '/links' })}>
              Share Link
            </Button>
          </div>
        </nav>
      )}

      <section className="w-full bg-transparent sm:bg-white sm:shadow-xl rounded-3xl py-12 px-12 sm:px-14 sm:w-sm -translate-y-5">
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="border-4 border-primary size-24 rounded-full bg-gray-100 mb-6" />
          <h2 className="heading-m text-gray-800 mb-2">John Wick</h2>
          <p className="body-m text-gray-500">johnwick@mail.com</p>
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
