import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { getServiceById, createBooking } from '../services/api';
import type { Service } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuthStore } from '../store/authStore';

// Validation schema for booking form
const bookingSchema = z.object({
  booking_date: z
    .string()
    .min(1, 'Booking date is required')
    .refine(
      (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
      'Booking date cannot be in the past'
    ),
  booking_time: z.string().min(1, 'Booking time is required'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const data = await getServiceById(parseInt(id));
          setService(data);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const onSubmit = async (data: BookingFormData) => {
    // Check authentication
    if (!isAuthenticated) {
      toast.error('Please login to book this service');
      navigate('/login');
      return;
    }

    if (!service) return;

    try {
      setIsSubmitting(true);
      await createBooking({
        service_id: service.id,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        notes: data.notes,
      });

      toast.success('Booking created successfully!');
      reset();
      navigate('/bookings');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create booking. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format price with Rupiah
  const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <LoadingSpinner />;
  if (!service) return <div className="text-center py-12">Service not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-semibold"
        >
          ← Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card hover={false}>
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl">💆</span>
                )}
              </div>
            </Card>
          </div>

          <div className="flex flex-col justify-center">
            {service.pet && (
              <div className="mb-4">
                <span className="inline-block bg-primary-200 text-primary-800 font-semibold px-4 py-2 rounded-full">
                  For {service.pet.name}
                </span>
              </div>
            )}

            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              {service.name}
            </h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatRupiah(service.price)}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {service.description || 'Professional service for your pet.'}
            </p>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 space-y-6 border-2 border-yellow-200 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800">
                Book This Service
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Booking Date Field */}
                <div>
                  <label
                    htmlFor="booking_date"
                    className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
                  >
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    Preferred Date
                  </label>
                  <input
                    {...register('booking_date')}
                    type="date"
                    id="booking_date"
                    min={new Date().toISOString().split('T')[0]}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.booking_date
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-yellow-300 focus:border-yellow-500'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  {errors.booking_date && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {errors.booking_date.message}
                    </p>
                  )}
                </div>

                {/* Booking Time Field */}
                <div>
                  <label
                    htmlFor="booking_time"
                    className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
                  >
                    <Clock className="w-5 h-5 text-yellow-600" />
                    Preferred Time
                  </label>
                  <input
                    {...register('booking_time')}
                    type="time"
                    id="booking_time"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.booking_time
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-yellow-300 focus:border-yellow-500'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  {errors.booking_time && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {errors.booking_time.message}
                    </p>
                  )}
                </div>

                {/* Notes Field */}
                <div>
                  <label
                    htmlFor="notes"
                    className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
                  >
                    <FileText className="w-5 h-5 text-yellow-600" />
                    Special Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    id="notes"
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Any special requirements or notes..."
                  />
                  {errors.notes && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isAuthenticated}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{isAuthenticated ? 'Book Now' : 'Login to Book'}</span>
                    </>
                  )}
                </button>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-600 text-center">
                    Please{' '}
                    <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                      login
                    </Link>{' '}
                    to book this service
                  </p>
                )}
              </form>
            </div>

            {service.pet && (
              <div className="mt-6">
                <Link
                  to={`/pets/${service.pet.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View more services for {service.pet.name} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
