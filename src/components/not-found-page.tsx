import { useNavigate } from '@tanstack/react-router';
import Button from './button';

export default function NotFoundPage() {
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
