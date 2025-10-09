import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Smartphone, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    whatsapp_number: z
      .string()
      .min(1, 'WhatsApp number is required')
      .regex(/^08\d{8,11}$/, 'WhatsApp number must start with 08 and be 10-13 digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      toast.success('Registration successful! Welcome to Petshop!');
      navigate('/');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4 shadow-lg shadow-yellow-500/50">
            <UserPlus className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join our petshop community today</p>
        </div>

        {/* Register Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-600 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* WhatsApp Number Field */}
            <div>
              <label
                htmlFor="whatsapp_number"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                WhatsApp Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register('whatsapp_number')}
                  type="text"
                  id="whatsapp_number"
                  placeholder="08xxxxxxxxxx"
                  className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${
                    errors.whatsapp_number
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-600 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isLoading}
                />
              </div>
              {errors.whatsapp_number && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.whatsapp_number.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-600 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Password Confirmation Field */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register('password_confirmation')}
                  type="password"
                  id="password_confirmation"
                  placeholder="Confirm your password"
                  className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${
                    errors.password_confirmation
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-600 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isLoading}
                />
              </div>
              {errors.password_confirmation && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-yellow-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
