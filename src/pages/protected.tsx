import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const { currentUser, loading } = {
    currentUser: null,
    loading: false,
  };

  if (loading) {
    return 'Loading...';
  }

  return currentUser ? <Outlet /> : <Navigate to="/signin" replace />;
}
