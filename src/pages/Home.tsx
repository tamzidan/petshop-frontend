import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPets, getProducts, getServices } from '../services/api';
import type { Pet, Product, Service } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsData, productsData, servicesData] = await Promise.all([
          getPets(),
          getProducts(),
          getServices(),
        ]);
        setPets(petsData.slice(0, 3));
        setProducts(productsData.slice(0, 3));
        setServices(servicesData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to PetShop 🐾
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              Everything your pet needs, all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Products
              </Link>
              <Link
                to="/services"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg border-2 border-white"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Lovely Pets 🐶🐱
            </h2>
            <p className="text-gray-600 text-lg">
              Meet our adorable companions looking for a home
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <Card key={pet.id}>
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  {pet.image_url ? (
                    <img
                      src={pet.image_url}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🐾</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {pet.description || 'Adorable pet waiting for you!'}
                  </p>
                  <Link
                    to={`/pets/${pet.id}`}
                    className="inline-block bg-primary-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/pets"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              View All Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Popular Products 🛍️
            </h2>
            <p className="text-gray-600 text-lg">
              Best quality products for your pets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description || 'Quality product for your pet'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-primary-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-500 transition-colors text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services ✨
            </h2>
            <p className="text-gray-600 text-lg">
              Professional care for your beloved pets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id}>
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <span className="text-6xl">💆</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {service.description || 'Professional service for your pet'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      Rp {service.price.toLocaleString('id-ID')}
                    </span>
                    <Link
                      to={`/services/${service.id}`}
                      className="bg-primary-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-500 transition-colors text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
