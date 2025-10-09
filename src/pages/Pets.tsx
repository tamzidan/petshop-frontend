import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPets } from '../services/api';
import type { Pet } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Lovely Pets 🐾
          </h1>
          <p className="text-gray-600 text-xl">
            Find your perfect companion
          </p>
        </div>

        {pets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No pets available at the moment.</p>
          </div>
        ) : (
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
                    <span className="text-7xl">🐾</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {pet.description || 'Adorable pet waiting for you!'}
                  </p>
                  <Link
                    to={`/pets/${pet.id}`}
                    className="inline-block w-full text-center bg-primary-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-500 transition-colors"
                  >
                    View Details
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

export default Pets;
