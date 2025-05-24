import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  weight: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'al-attar-cart';

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on initial mount and when user changes
  useEffect(() => {
    const storedCart = localStorage.getItem(`${CART_STORAGE_KEY}-${user?.id || 'guest'}`);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        setCart([]);
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`${CART_STORAGE_KEY}-${user?.id || 'guest'}`, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}