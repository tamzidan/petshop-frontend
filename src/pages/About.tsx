import { Link } from 'react-router-dom';
import { Heart, Star, Shield, Award, Sparkles, ShoppingBag } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              About ENHA PETSHOP
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-50 max-w-3xl mx-auto">
              Your Trusted Partner in Pet Care
            </p>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Bringing joy to pets and their families since the beginning
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Heart className="w-12 h-12 text-primary-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide the highest quality products and services that enhance the lives of pets and their owners.
                We are committed to offering exceptional care, expert advice, and a wide selection of premium pet supplies
                that meet the unique needs of every beloved companion.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Star className="w-12 h-12 text-primary-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the most trusted and beloved pet care destination, where every pet parent finds everything
                they need under one roof. We envision a community where pets thrive, families bond, and the
                joy of pet ownership is celebrated every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose ENHA PETSHOP?
            </h2>
            <p className="text-gray-600 text-lg">
              We go the extra mile to ensure your pet's happiness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Point 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-400 p-4 rounded-full">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the finest products from trusted brands, ensuring your pet gets the best nutrition and care
              </p>
            </div>

            {/* Point 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-400 p-4 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Care
              </h3>
              <p className="text-gray-600">
                Our professional team provides expert guidance and compassionate care for all your pet needs
              </p>
            </div>

            {/* Point 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-400 p-4 rounded-full">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Trusted Service
              </h3>
              <p className="text-gray-600">
                Safe, reliable, and professional services that you and your pets can count on every time
              </p>
            </div>

            {/* Point 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-400 p-4 rounded-full">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Exceptional Experience
              </h3>
              <p className="text-gray-600">
                A cheerful, welcoming environment that makes every visit a delightful experience for you and your pet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive solutions for all your pet care needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Pet Adoption
              </h3>
              <p className="text-gray-700 mb-4">
                Find your perfect furry companion from our selection of adorable, healthy, and well-cared-for pets
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Healthy & vaccinated pets
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Complete documentation
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Expert adoption guidance
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Premium Products
              </h3>
              <p className="text-gray-700 mb-4">
                Shop from a wide range of high-quality pet food, toys, accessories, and health products
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Nutritious pet food
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Fun toys & accessories
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Health & grooming supplies
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Professional Services
              </h3>
              <p className="text-gray-700 mb-4">
                Expert grooming, veterinary care, and boarding services tailored to your pet's needs
              </p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Professional grooming
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Health check-ups
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Pet boarding & daycare
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary-400 to-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Give Your Pet the Best?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Explore our products and services, or visit us to meet your future best friend!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg border-2 border-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Services
            </Link>
            <Link
              to="/pets"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg border-2 border-white"
            >
              <Heart className="w-5 h-5 mr-2" />
              Meet Our Pets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
