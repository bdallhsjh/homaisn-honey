import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../common/ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts({ featured: true, limit: 8 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 1;
  
  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="section-title mb-8">منتجاتنا المميزة</h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }
  
  if (error || !products.length) {
    return (
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="section-title mb-8">منتجاتنا المميزة</h2>
          <p className="text-center text-gray-500">
            لا توجد منتجات متاحة حالياً.
          </p>
        </div>
      </section>
    );
  }

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev + productsPerPage >= products.length ? 0 : prev + productsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev - productsPerPage < 0 ? Math.max(0, products.length - productsPerPage) : prev - productsPerPage
    );
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + productsPerPage);
  
  // If not enough products to fill the page, add from the beginning
  if (visibleProducts.length < productsPerPage) {
    visibleProducts.push(...products.slice(0, productsPerPage - visibleProducts.length));
  }

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Honeycomb pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-honeycomb-pattern"></div>
      
      <div className="container-custom relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">منتجاتنا المميزة</h2>
          <Link to="/products" className="text-primary-500 hover:text-primary-600 font-medium">
            عرض الكل
          </Link>
        </div>

        <div className="relative">
          {/* Products carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(${currentIndex * (100 / productsPerPage)}%)` }}
            >
              {visibleProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-3"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {products.length > productsPerPage && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="السابق"
              >
                <ChevronRight className="h-6 w-6 text-primary-500" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                aria-label="التالي"
              >
                <ChevronLeft className="h-6 w-6 text-primary-500" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;