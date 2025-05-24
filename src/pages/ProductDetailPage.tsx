import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowRight, Heart } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductCard from '../components/common/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  
  // Fetch related products
  const { products: relatedProducts } = useProducts({ 
    limit: 4,
    ...(product ? { type: product.type } : {})
  });

  // Filter out current product from related products
  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct.id !== productId
  ).slice(0, 4);

  // Set active image when product loads
  useEffect(() => {
    if (product) {
      setActiveImage(product.image_url);
      document.title = `${product.name} | عسل العطار`;
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      const { id, name, price, image_url, weight } = product;
      addToCart({ id, name, price, image_url, weight }, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">لم يتم العثور على المنتج</h2>
        <p className="mb-6">المنتج الذي تبحث عنه غير موجود أو تم حذفه.</p>
        <Link to="/products" className="btn-primary">
          العودة إلى المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li className="ml-2">
              <Link to="/" className="text-gray-500 hover:text-primary-500">
                الرئيسية
              </Link>
            </li>
            <li className="ml-2 text-gray-500">/</li>
            <li className="ml-2">
              <Link to="/products" className="text-gray-500 hover:text-primary-500">
                المنتجات
              </Link>
            </li>
            <li className="ml-2 text-gray-500">/</li>
            <li className="text-primary-500">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-white">
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail gallery */}
            {product.additional_images && product.additional_images.length > 0 && (
              <div className="flex space-x-4 space-x-reverse">
                <div 
                  className={`cursor-pointer border-2 rounded overflow-hidden w-20 h-20 ${
                    activeImage === product.image_url ? 'border-primary-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(product.image_url)}
                >
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.additional_images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border-2 rounded overflow-hidden w-20 h-20 ${
                      activeImage === image ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - صورة ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-600">{product.price} درهم</span>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-gray-600">{product.weight}</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 ml-2">النوع:</span>
                <span>{product.type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 ml-2">التوفر:</span>
                {product.in_stock ? (
                  <span className="text-green-500">متوفر</span>
                ) : (
                  <span className="text-red-500">غير متوفر</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 ml-4">الكمية:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleAddToCart}
                className="btn-primary flex items-center"
                disabled={!product.in_stock}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                إضافة إلى السلة
              </button>
              
              <button className="btn-secondary flex items-center">
                <Heart className="ml-2 h-5 w-5" />
                أضف للمفضلة
              </button>
            </div>
            
            {/* Back to products */}
            <div className="mt-8">
              <Link to="/products" className="text-primary-500 hover:text-primary-600 flex items-center">
                <ArrowRight className="ml-1 h-5 w-5" />
                العودة إلى المنتجات
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;