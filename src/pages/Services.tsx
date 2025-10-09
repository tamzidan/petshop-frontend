import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { getServices } from '../services/api';
import type { Service } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: '',
    max: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get unique pet types from services
  const petTypes = useMemo(() => {
    const types = services
      .map((service) => service.pet?.name)
      .filter((name): name is string => !!name);
    return Array.from(new Set(types));
  }, [services]);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search filter
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Pet type filter
      const matchesPetType =
        selectedPetType === 'all' || service.pet?.name === selectedPetType;

      // Price range filter
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPriceRange =
        service.price >= minPrice && service.price <= maxPrice;

      return matchesSearch && matchesPetType && matchesPriceRange;
    });
  }, [services, searchQuery, selectedPetType, priceRange]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPetType('all');
    setPriceRange({ min: '', max: '' });
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedPetType !== 'all' ||
    priceRange.min !== '' ||
    priceRange.max !== '';

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Services ✨
          </h1>
          <p className="text-gray-600 text-xl">
            Professional care for your beloved pets
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-400 transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Pet Type Filter */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 mr-2" />
                Pet Type
              </label>
              <select
                value={selectedPetType}
                onChange={(e) => setSelectedPetType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 transition-colors bg-white"
              >
                <option value="all">All Types</option>
                {petTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Price (Rp)
              </label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Price (Rp)
              </label>
              <input
                type="number"
                placeholder="No limit"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
              />
            </div>
          </div>

          {/* Results Count and Clear Filters */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-gray-600 font-medium">
              {filteredServices.length} result{filteredServices.length !== 1 ? 's' : ''} found
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">
              {hasActiveFilters
                ? 'No services match your filters. Try adjusting your search criteria.'
                : 'No services available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <span className="text-7xl">💆</span>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    {service.pet && (
                      <span className="inline-block bg-primary-200 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
                        For {service.pet.name}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {service.description || 'Professional service for your pet'}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      Rp {service.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-block w-full text-center bg-primary-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-500 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
