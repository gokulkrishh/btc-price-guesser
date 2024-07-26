import { getCurrentUser, GetCurrentUserOutput } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

const getUser = async () => {
  return await getCurrentUser();
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<GetCurrentUserOutput | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateUser = async () => {
      try {
        setLoading(true);
        const res = await getUser();
        setCurrentUser(res);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    updateUser();
  }, []);

  return { currentUser, loading };
};

export default useAuth;
