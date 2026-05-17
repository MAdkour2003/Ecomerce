import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils";

function Sidebar({ isOpen }) {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: "fa-home", label: "Home" },
    { path: "/Pro", icon: "fa-th-large", label: "Product" },
    { path: "/Pro", icon: "fa-cog", label: "Settings" },
    { path: "/about", icon: "fa-info-circle", label: "About" },
    { path: "/Store", icon: "fa-cog", label: "Store" },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar w-50 h-full px-4 ",
        isOpen ? "block" : "hidden",
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          //nav item
          className={`
            block
            p-3.5
            text-sidescontent
            no-underline
            cursor-pointer
            hover:bg-sideconthov ${
              location.pathname === item.path ? "active" : ""
            }`}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
