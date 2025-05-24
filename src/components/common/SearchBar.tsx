import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSupabase } from '../../contexts/SupabaseContext';
import { Database } from '../../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products from Supabase
  const searchProducts = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      setSuggestions(data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      if (onSearch) onSearch();
    }
  };

  const handleSuggestionClick = (productId: number) => {
    navigate(`/products/${productId}`);
    setShowSuggestions(false);
    if (onSearch) onSearch();
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="ابحث عن منتجات العسل..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          aria-label="بحث"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">جاري البحث...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product) => (
                <li 
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.id)}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded-md ml-3"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.weight} - {product.price} درهم</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-3 text-center text-gray-500">لم يتم العثور على نتائج</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;