import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;