import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Watch password for confirmation validation
  const password = watch('password', '');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
    document.title = 'إنشاء حساب | عسل العطار';
  }, [user, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        if (error.message.includes('already registered')) {
          setAuthError('البريد الإلكتروني مسجل بالفعل');
        } else {
          setAuthError(error.message);
        }
      } else {
        setSuccess(true);
        // No email confirmation is enabled, so user is logged in immediately
        // The redirect will happen automatically via the useEffect
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setAuthError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
          
          {authError && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              {authError}
            </div>
          )}
          
          {success ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">تم إنشاء الحساب بنجاح!</h3>
              <p className="mb-4">
                تم تسجيل دخولك تلقائيًا.
              </p>
              <Link to="/profile" className="btn-primary inline-block">
                الذهاب إلى الملف الشخصي
              </Link>
            </div>
          ) : (
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
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">كلمة المرور</label>
                <input
                  id="password"
                  type="password"
                  className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', { 
                    required: true,
                    minLength: 6
                  })}
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500 text-sm mt-1">كلمة المرور مطلوبة</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500 text-sm mt-1">يجب أن تتكون كلمة المرور من 6 أحرف على الأقل</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">تأكيد كلمة المرور</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  {...register('confirmPassword', { 
                    required: true,
                    validate: value => value === password || 'كلمات المرور غير متطابقة'
                  })}
                />
                {errors.confirmPassword?.type === 'required' && (
                  <p className="text-red-500 text-sm mt-1">تأكيد كلمة المرور مطلوب</p>
                )}
                {errors.confirmPassword?.type === 'validate' && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </button>
            </form>
          )}
          
          <div className="text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;