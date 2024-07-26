import HomeSkeleton from 'components/skeleton/home';
import { DataProvider } from 'contexts/data';
import { PriceProvider } from 'contexts/price';
import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return currentUser ? (
    <DataProvider>
      <PriceProvider>
        <Outlet />
      </PriceProvider>
    </DataProvider>
  ) : (
    <Navigate to="/signin" replace />
  );
}
