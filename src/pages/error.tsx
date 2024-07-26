import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError() as Error & { status?: string };

  return (
    <div>
      <h1 className="text-xl font-bold">{error?.status}</h1>
      <p className="mt-1">Page not found.</p>
    </div>
  );
}
