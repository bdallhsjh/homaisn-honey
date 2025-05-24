import { useEffect } from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Calendar, User } from 'lucide-react';

const BlogPage = () => {
  const { posts, loading, error } = useBlogPosts();

  // Update page title
  useEffect(() => {
    document.title = 'المدونة | عسل العطار';
  }, []);

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-2">مدونة عسل العطار</h1>
        <p className="text-gray-600 mb-8">تعرف على فوائد العسل وأحدث الأخبار والمقالات</p>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-500">حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">لا توجد مقالات متاحة حاليًا. يرجى العودة لاحقًا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              // Format date to Arabic
              const formattedDate = new Date(post.created_at).toLocaleDateString('ar-AE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <span className="flex items-center ml-4">
                        <Calendar className="h-4 w-4 ml-1" />
                        {formattedDate}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 ml-1" />
                        {post.author}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <button className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
                      قراءة المزيد
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Placeholder for when we have no real blog posts */}
        {!loading && !error && posts.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3">فوائد العسل للصحة</h2>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="flex items-center ml-4">
                      <Calendar className="h-4 w-4 ml-1" />
                      ١٥ أكتوبر ٢٠٢٣
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 ml-1" />
                      فريق عسل العطار
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    العسل من أكثر المواد الطبيعية التي تحتوي على فوائد صحية متعددة. تعرف على كيفية استخدام العسل للحصول على أقصى فائدة منه.
                  </p>
                  <button className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
                    قراءة المزيد
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;