import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuthUser } from '../store/authStore';
import { useCartActions } from '../store/hooks';
import { getProducts } from '../api/api';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAuthUser();
  const { syncRemoteCart } = useCartActions();

  useEffect(() => {
    if (!user) return;
    getProducts()
      .then((catalog) => syncRemoteCart(user.id, catalog))
      .catch(() => {});
  }, [user?.id]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className='flex h-[calc(100vh-60px)] mt-15'>
        <Sidebar isOpen={sidebarOpen} />
        <div className='flex-1 overflow-y-auto overflow-x-hidden'>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
