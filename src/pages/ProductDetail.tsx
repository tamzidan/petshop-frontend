import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Store, ExternalLink } from 'lucide-react';
import { getProductById } from '../services/api';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(parseInt(id));
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-semibold"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card hover={false}>
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl">📦</span>
                )}
              </div>
            </Card>
          </div>

          <div className="flex flex-col justify-center">
            {product.pet && (
              <div className="mb-4">
                <span className="inline-block bg-primary-200 text-primary-800 font-semibold px-4 py-2 rounded-full">
                  For {product.pet.name}
                </span>
              </div>
            )}

            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description || 'Quality product for your pet.'}
            </p>

            <div className="bg-primary-100 rounded-xl p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="bg-white text-primary-600 w-12 h-12 rounded-full font-bold hover:bg-primary-50 transition-colors shadow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="bg-white text-primary-600 w-12 h-12 rounded-full font-bold hover:bg-primary-50 transition-colors shadow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-primary-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-semibold">Total:</span>
                  <span className="text-3xl font-bold text-primary-600">
                    Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg w-full text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Marketplace Links */}
            {(product.shopee_url || product.tokopedia_url || product.lazada_url) && (
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Store className="w-5 h-5 text-primary-600" />
                  Also Available On
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.shopee_url && (
                    <a
                      href={product.shopee_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      <Store className="w-4 h-4" />
                      Shopee
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {product.tokopedia_url && (
                    <a
                      href={product.tokopedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Store className="w-4 h-4" />
                      Tokopedia
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {product.lazada_url && (
                    <a
                      href={product.lazada_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <Store className="w-4 h-4" />
                      Lazada
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {product.pet && (
              <div className="mt-6">
                <Link
                  to={`/pets/${product.pet.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View more products for {product.pet.name} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
