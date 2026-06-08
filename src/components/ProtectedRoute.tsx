import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated, useHasHydrated } from '../store/authStore';

function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated();
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectedRoute;
