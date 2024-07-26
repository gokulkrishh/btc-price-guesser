import { DataProvider } from 'contexts/data';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const { currentUser, loading } = {
    currentUser: true,
    loading: false,
  };

  if (loading) {
    return 'Loading...';
  }

  return currentUser ? (
    <DataProvider>
      <Outlet />
    </DataProvider>
  ) : (
    <Navigate to="/signin" replace />
  );
}
