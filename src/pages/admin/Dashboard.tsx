import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Calendar,
  PawPrint,
  Image,
  // Users,
  // TrendingUp
} from 'lucide-react';
import {
  adminGetPets,
  adminGetProducts,
  adminGetServices,
  adminGetBookings
} from '../../services/api';
import type { Pet, Product, Service, Booking } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadDashboardData();
  }, [isAdmin, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [petsData, productsData, servicesData, bookingsData] = await Promise.all([
        adminGetPets(),
        adminGetProducts(),
        adminGetServices(),
        adminGetBookings()
      ]);

      setPets(petsData);
      setProducts(productsData);
      setServices(servicesData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, newStatus: Booking['status']) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update booking');

      toast.success('Booking status updated');
      loadDashboardData();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const recentBookings = bookings.slice(0, 5);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-100 mt-1">Welcome back, {user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Pets */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pets.length}</p>
              </div>
              <div className="bg-primary-100 rounded-full p-3">
                <PawPrint className="w-8 h-8 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Services */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{services.length}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{bookings.length}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View All
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quick Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user?.whatsapp_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.service?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.booking_date}</div>
                        <div className="text-sm text-gray-500">{booking.booking_time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Manage Sliders */}
          <Link
            to="/admin/sliders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-orange-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Image className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Sliders</h3>
              <p className="text-sm text-gray-600 mb-4">Add, edit, or remove home sliders</p>
              <span className="text-orange-600 font-medium">Go to Sliders</span>
            </div>
          </Link>

          {/* Manage Pets */}
          <Link
            to="/admin/pets"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-primary-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 rounded-full p-4 mb-4">
                <PawPrint className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Pets</h3>
              <p className="text-sm text-gray-600 mb-4">Add, edit, or remove pet types</p>
              <span className="text-primary-600 font-medium">Go to Pets</span>
            </div>
          </Link>

          {/* Manage Products */}
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-blue-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <Package className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Products</h3>
              <p className="text-sm text-gray-600 mb-4">Add, edit, or remove products</p>
              <span className="text-blue-600 font-medium">Go to Products</span>
            </div>
          </Link>

          {/* Manage Services */}
          <Link
            to="/admin/services"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-green-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <ShoppingBag className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Services</h3>
              <p className="text-sm text-gray-600 mb-4">Add, edit, or remove services</p>
              <span className="text-green-600 font-medium">Go to Services</span>
            </div>
          </Link>

          {/* Manage Bookings */}
          <Link
            to="/admin/bookings"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-purple-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 rounded-full p-4 mb-4">
                <Calendar className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Bookings</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage all bookings</p>
              <span className="text-purple-600 font-medium">Go to Bookings</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
