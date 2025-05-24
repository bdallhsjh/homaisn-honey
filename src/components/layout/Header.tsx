import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../common/SearchBar';
import HoneyLogo from '../common/HoneyLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <HoneyLogo className="h-12 w-auto" />
          <span className="text-xl font-bold text-primary-800 mr-2">عسل العطار</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="nav-link">الرئيسية</Link>
          <Link to="/products" className="nav-link">المنتجات</Link>
          <Link to="/blog" className="nav-link">المدونة</Link>
          <Link to="/about" className="nav-link">من نحن</Link>
          <Link to="/contact" className="nav-link">اتصل بنا</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="بحث"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link to={user ? '/profile' : '/login'} className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3 space-x-reverse">
          <Link to="/cart" className="p-2 relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="p-2" aria-label="قائمة">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container-custom flex flex-col space-y-4">
            <Link to="/" className="py-2 px-4 hover:bg-gray-100 rounded">الرئيسية</Link>
            <Link to="/products" className="py-2 px-4 hover:bg-gray-100 rounded">المنتجات</Link>
            <Link to="/blog" className="py-2 px-4 hover:bg-gray-100 rounded">المدونة</Link>
            <Link to="/about" className="py-2 px-4 hover:bg-gray-100 rounded">من نحن</Link>
            <Link to="/contact" className="py-2 px-4 hover:bg-gray-100 rounded">اتصل بنا</Link>
            <Link to={user ? '/profile' : '/login'} className="py-2 px-4 hover:bg-gray-100 rounded">
              {user ? 'حسابي' : 'تسجيل الدخول'}
            </Link>
            <button 
              onClick={toggleSearch}
              className="flex items-center py-2 px-4 hover:bg-gray-100 rounded"
            >
              <Search className="h-5 w-5 ml-2" />
              بحث
            </button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">البحث</h2>
              <button onClick={toggleSearch} className="p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            <SearchBar onSearch={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;