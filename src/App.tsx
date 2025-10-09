import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNavbar from './components/BottomNavbar';

// Public Pages
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetail from './pages/PetDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Protected Pages
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPets from './pages/admin/Pets';
import AdminProducts from './pages/admin/Products';
import AdminServices from './pages/admin/Services';
import AdminBookings from './pages/admin/Bookings';
import AdminSliders from './pages/admin/Sliders';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pb-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/pets" element={<AdminPets />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/sliders" element={<AdminSliders />} />

            {/* 404 Not Found - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;
