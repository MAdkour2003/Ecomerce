import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main className={`main-content ${!sidebarOpen ? "ml-0" : ""}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
