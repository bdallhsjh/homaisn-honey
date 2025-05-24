import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ArrowUpDown } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const typeFilter = searchParams.get('type');

  const [selectedType, setSelectedType] = useState(typeFilter || '');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'popularity'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products based on filters
  const { products, loading, error } = useProducts({
    type: selectedType || undefined,
    sortBy,
  });

  // Filter products by search query if present
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Update page title
  useEffect(() => {
    document.title = searchQuery
      ? `نتائج البحث: ${searchQuery} | عسل العطار`
      : selectedType
      ? `${selectedType} | عسل العطار`
      : 'جميع المنتجات | عسل العطار';
  }, [searchQuery, selectedType]);

  // All available product types
  const productTypes = ['سدر', 'زهور', 'أكاسيا', 'غابة', 'جبلي'];

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">
          {searchQuery
            ? `نتائج البحث: ${searchQuery}`
            : selectedType
            ? `عسل ${selectedType}`
            : 'جميع منتجاتنا'}
        </h1>

        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center mb-4 md:mb-0 text-gray-700 hover:text-primary-500"
            >
              <Filter className="h-5 w-5 ml-1" />
              فلترة المنتجات
            </button>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-700 ml-2">
                ترتيب حسب:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="popularity">الأكثر شهرة</option>
                <option value="price_asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price_desc">السعر: من الأعلى إلى الأقل</option>
              </select>
            </div>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-bold mb-3 flex items-center">
                <ArrowUpDown className="h-4 w-4 ml-1" />
                تصفية حسب النوع
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === ''
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  الكل
                </button>
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedType === type
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-500">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery
                ? `لم يتم العثور على منتجات تطابق "${searchQuery}"`
                : 'لا توجد منتجات متاحة حاليًا'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;