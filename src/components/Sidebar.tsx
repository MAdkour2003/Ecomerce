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

const navItems: NavItem[] = [
  { path: '/', icon: 'fa-home', label: 'Home' },
  { path: '/products', icon: 'fa-th-large', label: 'Products' },
  { path: '/profile', icon: 'fa-user', label: 'My Profile' },
];

function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={cn('bg-sidebar w-50 h-full px-4', isOpen ? 'block' : 'hidden')}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            'block p-3.5 text-sidescontent no-underline cursor-pointer hover:bg-sideconthov',
            location.pathname === item.path && 'bg-sideconthov'
          )}
        >
          <i className={`fas ${item.icon} mr-2`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
