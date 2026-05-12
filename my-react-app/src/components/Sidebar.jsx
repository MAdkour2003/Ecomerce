import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen }) {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: "fa-home", label: "Home" },
    { path: "/Pro", icon: "fa-th-large", label: "Product" },
    { path: "/Pro", icon: "fa-cog", label: "Settings" },
    { path: "/about", icon: "fa-info-circle", label: "About" },
  ];

  return (
    <aside
      // sidebar
      className={`
        bg-[#0a5bb7bb]
        w-50
        h-full
        fixed
        top-10
        px-4 ${isOpen ? "block" : "hidden"}`}
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          //nav item
          className={`
            block
            p-3.5
            text-zinc-800
            no-underline
            cursor-pointer
            hover:bg-gray-300 ${location.pathname === item.path ? "active" : ""}`}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
