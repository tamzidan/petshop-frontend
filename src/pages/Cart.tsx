import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingBag className="w-12 h-12 text-primary-500" />
            Shopping Cart
          </h1>
          {!isEmpty && (
            <p className="text-gray-600 mt-2">
              You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {isEmpty ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <Card hover={false}>
              <div className="py-16 px-8">
                <div className="text-9xl mb-6">🛒</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Looks like you haven't added anything to your cart yet.
                  <br />
                  Start shopping to make your pets happy!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Products
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} hover={false}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center overflow-hidden">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl">📦</span>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <Link
                            to={`/products/${item.product.id}`}
                            className="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.pet && (
                            <p className="text-sm text-gray-600 mt-1">
                              For {item.product.pet.name}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full ml-4"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-2xl font-bold text-primary-600 mb-4">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-primary-50 rounded-full px-4 py-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="text-primary-600 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <span className="text-lg font-bold text-gray-800 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product.id, item.quantity + 1)
                            }
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="hidden sm:block">
                          <span className="text-sm text-gray-600">Subtotal: </span>
                          <span className="text-lg font-bold text-gray-800">
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Subtotal */}
                      <div className="sm:hidden mt-3 text-right">
                        <span className="text-sm text-gray-600">Subtotal: </span>
                        <span className="text-lg font-bold text-gray-800">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card hover={false}>
                  <div className="bg-gradient-to-br from-primary-400 to-primary-500 text-white rounded-t-xl -m-6 mb-6 p-6">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-gray-700">
                      <span className="font-semibold">Items ({items.length}):</span>
                      <span className="font-bold">Rp {getTotal().toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700">
                      <span className="font-semibold">Shipping:</span>
                      <span className="text-sm text-gray-600">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total:</span>
                        <span className="text-3xl font-bold text-primary-600">
                          Rp {getTotal().toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isEmpty}
                    className="w-full bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/products"
                    className="block text-center text-primary-600 hover:text-primary-700 mt-4 font-semibold transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </Card>

                {/* Info Card */}
                <Card hover={false}>
                  <div className="bg-primary-50 rounded-lg p-4 mt-6">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary-600" />
                      Shopping Information
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Free shipping on orders over Rp 500,000</li>
                      <li>✓ Secure checkout</li>
                      <li>✓ 7-day return policy</li>
                      <li>✓ Quality guaranteed</li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
