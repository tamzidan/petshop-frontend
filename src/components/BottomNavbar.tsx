import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Calendar, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const BottomNavbar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home'
    },
    {
      path: '/products',
      icon: ShoppingBag,
      label: 'Products'
    },
    {
      path: user ? '/bookings' : '/login',
      icon: Calendar,
      label: 'Bookings'
    },
    {
      path: user ? '/profile' : '/login',
      icon: User,
      label: user ? 'Profile' : 'Login'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors ${
                  active
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? 'stroke-2' : 'stroke-[1.5]'}`} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
