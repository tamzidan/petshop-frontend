const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-600 to-primary-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🐾</span>
              Enha Petshop
            </h3>
            <p className="text-primary-100">
              Your trusted partner for pet care. We provide quality products and
              services for your beloved pets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-100">
              <li>
                <a href="/pets" className="hover:text-white transition-colors">
                  Our Pets
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-primary-100">
              <li>📧 info@petshop.com</li>
              <li>📱 +62 123 4567 890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-500 mt-8 pt-6 text-center text-primary-100">
          <p>&copy; {new Date().getFullYear()} Enha Petshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
