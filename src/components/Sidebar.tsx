import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/', icon: 'fa-home', label: 'Home' },
    { path: '/Products', icon: 'fa-th-large', label: 'Product' },
  ];

  return (
    <aside className={cn('bg-sidebar w-50 h-full px-4', isOpen ? 'block' : 'hidden')}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`
            block
            p-3.5
            text-sidescontent
            no-underline
            cursor-pointer
            hover:bg-sideconthov ${location.pathname === item.path ? 'active' : ''}`}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
