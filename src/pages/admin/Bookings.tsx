import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Trash2, Phone, Filter } from 'lucide-react';
import {
  adminGetBookings,
  adminUpdateBooking,
  adminDeleteBooking
} from '../../services/api';
import type { Booking } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Bookings = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadBookings();
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(b => b.status === statusFilter));
    }
  }, [statusFilter, bookings]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await adminGetBookings();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: number, newStatus: Booking['status']) => {
    try {
      await adminUpdateBooking(bookingId, newStatus);
      toast.success('Booking status updated');
      loadBookings();
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast.error(error.response?.data?.message || 'Failed to update booking status');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteBooking(id);
      toast.success('Booking deleted successfully');
      setDeleteConfirm(null);
      loadBookings();
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      toast.error(error.response?.data?.message || 'Failed to delete booking');
    }
  };

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

  const getStatusCount = (status: string) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(b => b.status === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Manage Bookings</h1>
              <p className="text-primary-100 mt-1">View and manage all service bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Status</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({getStatusCount('all')})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({getStatusCount('pending')})
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'confirmed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed ({getStatusCount('confirmed')})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({getStatusCount('completed')})
            </button>
            <button
              onClick={() => setStatusFilter('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled ({getStatusCount('cancelled')})
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {statusFilter === 'all' ? 'No bookings yet' : `No ${statusFilter} bookings`}
            </h3>
            <p className="text-gray-600">
              {statusFilter === 'all'
                ? 'Bookings will appear here when customers make reservations'
                : 'Try changing the filter to see other bookings'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <>
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{booking.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user?.name}
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            <a
                              href={`https://wa.me/${booking.user?.whatsapp_number}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-green-600"
                            >
                              {booking.user?.whatsapp_number}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.service?.name}</div>
                          <div className="text-sm text-gray-500">
                            Rp {booking.service?.price.toLocaleString()}
                          </div>
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
                            onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setDeleteConfirm(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                      {deleteConfirm === booking.id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-red-50">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-red-800 font-medium">
                                Are you sure you want to delete this booking? This action cannot be undone.
                              </p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDelete(booking.id)}
                                  className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                                >
                                  Yes, Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      {booking.notes && (
                        <tr className="bg-gray-50">
                          <td colSpan={7} className="px-6 py-3">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Notes:</span> {booking.notes}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('pending')}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('confirmed')}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('completed')}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('cancelled')}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
