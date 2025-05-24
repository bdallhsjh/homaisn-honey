import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
    document.title = 'تسجيل الدخول | عسل العطار';
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else {
          setAuthError(error.message);
        }
      } else {
        // Redirect will happen automatically via the useEffect
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAuthError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
          
          {authError && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', { 
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })}
              />
              {errors.email?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">البريد الإلكتروني مطلوب</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="text-red-500 text-sm mt-1">يرجى إدخال بريد إلكتروني صحيح</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700">كلمة المرور</label>
                <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-600">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">كلمة المرور مطلوبة</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full mb-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;