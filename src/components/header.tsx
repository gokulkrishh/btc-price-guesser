import { Logo, SignOutIcon } from 'components/icons';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import Loader from './loader';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    let isSuccess = false;
    try {
      setIsLoading(true);
      await signOut({ global: true });
      isSuccess = true;
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
      if (isSuccess) {
        navigate('/signin');
      }
    }
  };

  return (
    <header className="mt-1 flex justify-between">
      <div className="flex items-center w-full gap-1.5">
        <Logo className="w-8 h-8" />
        <h1 className="text-xl font-black">Price Guesser</h1>
      </div>

      <div className="h-9">
        {!isAuthLoading && currentUser ? (
          <button
            disabled={isLoading}
            onClick={handleSignOut}
            className="inline-flex items-center tracking-tight justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium"
          >
            {isLoading ? (
              <Loader className="!text-white" />
            ) : (
              <>
                <SignOutIcon className="mr-1" /> Logout
              </>
            )}
          </button>
        ) : null}
      </div>
    </header>
  );
}
