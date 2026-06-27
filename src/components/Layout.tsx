import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuthUser } from "../store/authStore";
import { useCartActions } from "../store/hooks";

import { Useproducts } from "../Hook/UseProduct";
import { useRemoteCart } from "../Hook/useCart";
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAuthUser();
  const { syncRemoteCart } = useCartActions();
  const { data: catalog } = Useproducts();
  const { data: remoteCart } = useRemoteCart(user?.id ?? 0);

  useEffect(() => {
    if (!user || !catalog || !remoteCart) return;
    syncRemoteCart(remoteCart, catalog);
  }, [user, catalog, remoteCart, syncRemoteCart]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className="flex h-[calc(100vh-60px)] mt-15">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
