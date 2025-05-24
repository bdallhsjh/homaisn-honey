import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isAnimating, setIsAnimating] = useState<number | null>(null);

  // Update page title
  useEffect(() => {
    document.title = 'سلة التسوق | عسل العطار';
  }, []);

  const handleRemove = (productId: number) => {
    setIsAnimating(productId);
    
    // Add slight delay for animation
    setTimeout(() => {
      removeFromCart(productId);
      setIsAnimating(null);
    }, 300);
  };

  if (cart.length === 0) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-primary-500 mb-4">
              <ShoppingBag className="h-16 w-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
            <p className="text-gray-600 mb-6">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.
            </p>
            <Link to="/products" className="btn-primary">
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-gray-700 font-medium">
                  <div className="col-span-6">المنتج</div>
                  <div className="col-span-2 text-center">السعر</div>
                  <div className="col-span-2 text-center">الكمية</div>
                  <div className="col-span-2 text-center">الإجمالي</div>
                </div>
              </div>

              {/* Cart item list */}
              <ul>
                {cart.map((item) => (
                  <li 
                    key={item.id}
                    className={`border-b last:border-b-0 p-4 transition-all duration-300 ${
                      isAnimating === item.id ? 'opacity-0 transform translate-x-full' : ''
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="col-span-6 flex items-center">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded ml-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.weight}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span>{item.price} درهم</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-primary-500"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-primary-500"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 text-center flex items-center justify-between">
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)} درهم</span>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="حذف"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/products" className="text-primary-500 hover:text-primary-600 flex items-center">
                <ArrowRight className="ml-1 h-5 w-5" />
                متابعة التسوق
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">إجمالي المنتجات</span>
                  <span>{cartTotal.toFixed(2)} درهم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التوصيل</span>
                  <span>مجاني</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>الإجمالي</span>
                <span className="text-primary-600">{cartTotal.toFixed(2)} درهم</span>
              </div>
              
              <Link to="/checkout" className="btn-primary w-full block text-center">
                إتمام الطلب
              </Link>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                الدفع عند الاستلام فقط
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;