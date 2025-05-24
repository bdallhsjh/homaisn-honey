import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Database } from '../../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { id, name, price, image_url, weight } = product;
    addToCart({ id, name, price, image_url, weight }, 1);
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="card group transform transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
            مميز
          </div>
        )}
        <div 
          className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white text-primary-500 p-3 rounded-full shadow-md hover:bg-primary-50 transition-colors duration-200"
            aria-label="أضف إلى السلة"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 text-gray-800">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{product.weight}</span>
          <span className="font-bold text-primary-700">{product.price} درهم</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">{product.type}</div>
      </div>
    </Link>
  );
};

export default ProductCard;