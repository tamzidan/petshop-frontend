import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPetById } from '../services/api';
import type { Pet } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        if (id) {
          const data = await getPetById(parseInt(id));
          setPet(data);
        }
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!pet) return <div className="text-center py-12">Pet not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/pets"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-semibold"
        >
          ← Back to Pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <Card hover={false}>
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                {pet.image_url ? (
                  <img
                    src={pet.image_url}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl">🐾</span>
                )}
              </div>
            </Card>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              {pet.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {pet.description || 'No description available.'}
            </p>
            <div className="bg-primary-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Interested in {pet.name}?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact us to learn more about this adorable pet!
              </p>
              <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg w-full">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {pet.products && pet.products.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Products for {pet.name} 🛍️
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pet.products.map((product) => (
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
                      {product.description || 'Quality product'}
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
          </section>
        )}

        {/* Related Services */}
        {pet.services && pet.services.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Services for {pet.name} ✨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pet.services.map((service) => (
                <Card key={service.id}>
                  <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl">💆</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {service.description || 'Professional service'}
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
          </section>
        )}
      </div>
    </div>
  );
};

export default PetDetail;
