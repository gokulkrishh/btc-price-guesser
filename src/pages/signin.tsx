import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Logo } from 'components/icons';
import Loader from 'components/loader';
import useAuth from 'hooks/useAuth';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (user.currentUser) navigate('/');
  }, [navigate, user]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Link to="/">
          <Logo className="mx-auto h-16 w-16" />
        </Link>
        <h2 className="mt-3 font-bold flex items-center gap-2 text-zinc-900 text-2xl tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <form
        className="flex gap-3 w-full sm:max-w-sm mx-auto mt-4 flex-col"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold leading-6"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            className="block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-zinc-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            autoFocus
            inputMode="email"
            autoComplete="email"
            type="email"
            placeholder="tim@apple.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold leading-6"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-zinc-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            autoComplete="password"
            required
          />
        </div>
        <button
          disabled={loading}
          className="items-center mt-3 max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-zinc-900/90 rounded-xl bg-zinc-900 px-3 h-10 text-white font-medium flex space-x-2 w-full"
          type="submit"
        >
          {loading ? <Loader /> : 'Submit'}
        </button>
      </form>
      <p className="text-center mt-4 text-sm font-medium text-zinc-700">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-zinc-900 font-semibold border-zinc-900 border-b"
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
}
