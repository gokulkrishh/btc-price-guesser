import { getCurrentUser, GetCurrentUserOutput } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

const getUser = async () => {
  return await getCurrentUser();
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<GetCurrentUserOutput | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateUser = async () => {
      try {
        setIsLoading(true);
        const res = await getUser();
        setCurrentUser(res);
      } catch {
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    updateUser();
  }, []);

  return { currentUser, isLoading };
};

export default useAuth;
