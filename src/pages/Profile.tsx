import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Shield, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4 shadow-lg shadow-yellow-500/50">
            <User className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header Banner */}
          <div className="h-24 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>

          {/* Profile Content */}
          <div className="px-6 sm:px-8 pb-8 -mt-12">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gray-900 border-4 border-gray-800 rounded-full flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            {/* User Info Grid */}
            <div className="space-y-6">
              {/* Name */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Full Name</h3>
                    <p className="text-lg font-semibold text-white break-words">{user.name}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">WhatsApp Number</h3>
                    <p className="text-lg font-semibold text-white break-words">{user.whatsapp_number}</p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Role</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === 'admin'
                            ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                            : 'bg-gray-700 text-gray-300 border border-gray-600'
                        }`}
                      >
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Member Since</h3>
                    <p className="text-lg font-semibold text-white">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
