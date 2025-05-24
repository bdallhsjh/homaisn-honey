import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="py-20">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-12">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">الصفحة غير موجودة</h2>
          <p className="text-gray-600 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <Home className="ml-2 h-5 w-5" />
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;