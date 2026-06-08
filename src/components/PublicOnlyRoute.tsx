import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  if (!hasHydrated) return null;

  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
}

export default PublicOnlyRoute;
