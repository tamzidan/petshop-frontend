import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getBookings } from '../services/api';
import type { Booking } from '../types';
import toast from 'react-hot-toast';

export default function Bookings() {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getBookings();
        setBookings(data);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load bookings';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    // timeString is in HH:MM:SS format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusConfig = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: AlertCircle,
          label: 'Pending',
          bgColor: 'bg-yellow-400/20',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-400/30',
        };
      case 'confirmed':
        return {
          icon: CheckCircle,
          label: 'Confirmed',
          bgColor: 'bg-blue-400/20',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-400/30',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Completed',
          bgColor: 'bg-green-400/20',
          textColor: 'text-green-400',
          borderColor: 'border-green-400/30',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          label: 'Cancelled',
          bgColor: 'bg-red-400/20',
          textColor: 'text-red-400',
          borderColor: 'border-red-400/30',
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4 shadow-lg shadow-yellow-500/50">
            <Calendar className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-gray-400">View and manage your service bookings</p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No Bookings Yet</h3>
            <p className="text-gray-400 mb-6">
              You haven't made any service bookings yet. Start by browsing our services!
            </p>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-500/30"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {bookings.map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={booking.id}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Status Banner */}
                  <div
                    className={`${statusConfig.bgColor} ${statusConfig.textColor} px-6 py-3 border-b ${statusConfig.borderColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-5 h-5" />
                        <span className="font-semibold text-sm uppercase tracking-wide">
                          {statusConfig.label}
                        </span>
                      </div>
                      <span className="text-xs opacity-75">
                        Booking #{booking.id}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 space-y-4">
                    {/* Service Name */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {booking.service?.name || 'Service'}
                      </h3>
                      {booking.service?.pet?.name && (
                        <p className="text-sm text-gray-400">
                          For: {booking.service.pet.name}
                        </p>
                      )}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-medium text-gray-400">Date</span>
                        </div>
                        <p className="text-sm font-semibold text-white">
                          {formatDate(booking.booking_date)}
                        </p>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-medium text-gray-400">Time</span>
                        </div>
                        <p className="text-sm font-semibold text-white">
                          {formatTime(booking.booking_time)}
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    {booking.notes && (
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-medium text-gray-400">Notes</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    {/* Price */}
                    {booking.service?.price && (
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Service Price</span>
                          <span className="text-xl font-bold text-yellow-400">
                            Rp {booking.service.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
