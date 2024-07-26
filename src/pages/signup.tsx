import { confirmSignUp, signUp } from 'aws-amplify/auth';
import { Logo } from 'components/icons';
import Loader from 'components/loader';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmCodeSent, setConfirmCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.email ||
      !form.password ||
      form.password !== form.confirmPassword
    ) {
      return;
    }

    let isSuccess;
    try {
      setLoading(true);
      setFormError('');
      const response = await signUp({
        username: form.email,
        password: form.password,
      });
      setConfirmCodeSent(true);
      console.log(response);
    } catch (error) {
      let message = 'An unexpected error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      setFormError(message);
    } finally {
      setLoading(false);
      if (isSuccess) navigate('/signin');
    }
  };

  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email || !form.code) {
      return;
    }

    let isSuccess;

    try {
      setFormError('');
      setLoading(true);
      const response = await confirmSignUp({
        username: form.email,
        confirmationCode: form.code,
      });
      isSuccess = response.isSignUpComplete;
    } catch (error) {
      let message = 'An unexpected error occurred.';
      if (error instanceof Error) {
        message = error.message;
      }
      setFormError(message);
    } finally {
      setLoading(false);
      if (isSuccess) navigate('/');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Link to="/">
          <Logo className="mx-auto h-16 w-16" />
        </Link>
        <h2 className="mt-3 font-bold flex items-center gap-2 text-zinc-900 text-2xl tracking-tight">
          Sign up here
        </h2>
      </div>
      {confirmCodeSent ? (
        <form
          className="flex gap-3 w-full sm:max-w-sm mx-auto mt-4 flex-col"
          onSubmit={handleCodeSubmit}
        >
          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-semibold leading-6"
            >
              Authentication Code
            </label>
            <input
              id="code"
              name="code"
              className="block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-zinc-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              autoFocus
              inputMode="numeric"
              autoComplete="off"
              type="number"
              placeholder="123456"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>

          <button
            className="items-center mt-3 max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-zinc-900/90 rounded-xl bg-zinc-900 px-3 h-10 text-white font-medium flex space-x-2 w-full"
            type="submit"
          >
            {loading ? <Loader /> : 'Submit'}
          </button>
        </form>
      ) : (
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
              autoComplete="email"
              type="email"
              placeholder="tim@apple.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold leading-6"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-zinc-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              autoComplete="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <button
            className="items-center mt-3 max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-zinc-900/90 rounded-xl bg-zinc-900 px-3 h-10 text-white font-medium flex space-x-2 w-full"
            type="submit"
          >
            {loading ? <Loader /> : 'Submit'}
          </button>
        </form>
      )}

      <p className="text-center mt-4 text-sm font-medium text-zinc-700">
        Already have an account?{' '}
        <Link
          to="/signin"
          className="text-zinc-900 font-semibold border-zinc-900 border-b"
        >
          Sign in
        </Link>
      </p>

      {formError ? (
        <p className="text-red-600 text-sm font-medium text-center mt-4">
          {formError}
        </p>
      ) : null}

      {!formError && confirmCodeSent ? (
        <p className="text-green-600 text-sm font-medium text-center mt-4">
          Email with authentication code is sent. Check your inbox!
        </p>
      ) : null}
    </div>
  );
}
