import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, LogOut, LayoutDashboard, Calendar } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemCount = getItemCount();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-primary-400 to-primary-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/enha-petshop-logo.png"
              alt="Enha Petshop Logo"
              className="h-8 sm:h-10 w-auto"
            />
            <span className="text-2xl font-bold text-white">Enha Petshop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/pets"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              Pets
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-primary-900 transition-colors font-medium"
            >
              Contact
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative text-white hover:text-primary-900 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu or Login Button */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-primary-900 transition-colors font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 flex items-center space-x-2"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-primary-500 px-4 py-2 rounded-md font-medium hover:bg-primary-100 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pets"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Pets
            </Link>
            <Link
              to="/products"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 py-2 text-white hover:text-primary-900 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <>
                <div className="border-t border-primary-300 my-2 pt-2">
                  <div className="py-2 text-white font-semibold">
                    {user?.name}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 py-2 text-white hover:text-primary-900 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/bookings"
                    className="flex items-center space-x-2 py-2 text-white hover:text-primary-900 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>My Bookings</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 py-2 text-white hover:text-primary-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 py-2 text-white hover:text-primary-900 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-white hover:text-primary-900 transition-colors font-medium border-t border-primary-300 mt-2 pt-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
