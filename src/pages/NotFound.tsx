import { Link } from 'react-router-dom';
import { Home, Search, PawPrint, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Paw Prints */}
        <div className="flex justify-center gap-8 mb-8 animate-bounce">
          <PawPrint className="w-16 h-16 text-yellow-400 opacity-70 rotate-12" />
          <PawPrint className="w-20 h-20 text-yellow-500 opacity-90" />
          <PawPrint className="w-16 h-16 text-yellow-400 opacity-70 -rotate-12" />
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yellow-400 mb-2">404</h1>
          <div className="flex items-center justify-center gap-2 text-2xl text-gray-700 font-semibold">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
            <span>Lost Pet Alert!</span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-yellow-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! This page wandered off...
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Just like a curious puppy, this page has gone exploring and can't be found.
            Don't worry though, we'll help you get back on track!
          </p>

          {/* Fun Message */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
            <p className="text-gray-700 italic">
              "Not all who wander are lost... but this page definitely is!"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>

            <Link
              to="/pets"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-200 border-2 border-yellow-400 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Browse Pets
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-gray-600">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/products" className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">
              Products
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/services" className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">
              Services
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/about" className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">
              About Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
