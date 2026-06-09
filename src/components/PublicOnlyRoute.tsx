import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated, useHasHydrated } from '../store/authStore';

function PublicOnlyRoute() {
  const isAuthenticated = useIsAuthenticated();
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return null;

  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
}

export default PublicOnlyRoute;
