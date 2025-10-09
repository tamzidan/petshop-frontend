import { Phone, MapPin, Clock, Mail, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const whatsappNumber = '6281234567890'; // Replace with actual WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <MessageCircle className="w-16 h-16 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-50 max-w-3xl mx-auto">
              We'd Love to Hear From You!
            </p>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Have questions about our products or services? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Contact Information
              </h2>

              {/* WhatsApp Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-green-200">
                <div className="flex items-start">
                  <div className="bg-green-500 p-3 rounded-full mr-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Chat with us directly for quick responses!
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-500 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-700 text-lg">
                      +62 812-3456-7890
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Call us during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-500 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Address
                    </h3>
                    <p className="text-gray-700">
                      Jl. Pet Lovers No. 123<br />
                      Jakarta Selatan, DKI Jakarta<br />
                      12345, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-500 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-700 text-lg">
                      info@enhapetshop.com
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-500 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Operating Hours
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-semibold">Monday - Friday:</span>
                        <span>09:00 AM - 08:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Saturday:</span>
                        <span>09:00 AM - 09:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Sunday:</span>
                        <span>10:00 AM - 06:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Visit Our Store
              </h2>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-700 text-lg mb-4">
                    Find us on the map
                  </p>
                  <p className="text-gray-600 mb-6">
                    We're located in the heart of Jakarta, easy to reach and plenty of parking available!
                  </p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Alternative: Uncomment to use actual Google Maps embed */}
              {/*
              <div className="rounded-xl shadow-lg overflow-hidden h-96">
                <iframe
                  title="ENHA Petshop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              */}

              {/* Social Media Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Follow Us on Social Media
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://instagram.com/enhapetshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://facebook.com/enhapetshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-4 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com/enhapetshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 p-4 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-center text-gray-600 mt-6">
                  Stay updated with our latest arrivals, promotions, and pet care tips!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-400 to-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Our friendly team is ready to help you and your furry friends!
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center bg-green-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Start WhatsApp Chat
          </button>
          <p className="mt-6 text-primary-100">
            We typically respond within minutes during business hours
          </p>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Before You Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Parking Available
              </h3>
              <p className="text-gray-700">
                We have ample parking space for your convenience. Free parking for all customers!
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Pet-Friendly Store
              </h3>
              <p className="text-gray-700">
                Feel free to bring your pets along! We welcome well-behaved pets on leashes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Staff
              </h3>
              <p className="text-gray-700">
                Our knowledgeable team can help you choose the right products and services for your pet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Appointment Booking
              </h3>
              <p className="text-gray-700">
                For grooming and veterinary services, we recommend booking in advance via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
