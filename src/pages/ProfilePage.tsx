import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useSupabase } from '../contexts/SupabaseContext';
import { User, Package, Heart, LogOut } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

type ProfileFormData = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
};

const ProfilePage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
    document.title = 'الملف الشخصي | عسل العطار';
  }, [user, authLoading, navigate]);

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setValue('fullName', data.full_name || '');
          setValue('phone', data.phone || '');
          setValue('address', data.address || '');
          setValue('city', data.city || '');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();
  }, [user, supabase, setValue]);

  // Load user orders
  useEffect(() => {
    const loadOrders = async () => {
      if (!user || activeTab !== 'orders') return;
      
      setLoadingOrders(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setOrders(data || []);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    
    loadOrders();
  }, [user, supabase, activeTab]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    setUpdateSuccess(false);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.fullName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">الملف الشخصي</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-primary-50 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="font-bold text-lg">{user.email}</h2>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-right py-3 px-4 rounded-lg flex items-center ${
                        activeTab === 'profile' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <User className="ml-3 h-5 w-5" />
                      الملف الشخصي
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-right py-3 px-4 rounded-lg flex items-center ${
                        activeTab === 'orders' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Package className="ml-3 h-5 w-5" />
                      طلباتي
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full text-right py-3 px-4 rounded-lg flex items-center ${
                        activeTab === 'wishlist' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="ml-3 h-5 w-5" />
                      المفضلة
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-right py-3 px-4 rounded-lg flex items-center text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="ml-3 h-5 w-5" />
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">معلومات الملف الشخصي</h2>
                  
                  {updateSuccess && (
                    <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                      تم تحديث معلومات الملف الشخصي بنجاح.
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="input-field bg-gray-50"
                      />
                      <p className="text-sm text-gray-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="fullName" className="block text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        id="fullName"
                        type="text"
                        className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                        {...register('fullName')}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        id="phone"
                        type="tel"
                        className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                        {...register('phone')}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-gray-700 mb-2">العنوان</label>
                      <input
                        id="address"
                        type="text"
                        className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                        {...register('address')}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="city" className="block text-gray-700 mb-2">المدينة</label>
                      <select
                        id="city"
                        className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                        {...register('city')}
                      >
                        <option value="">اختر المدينة</option>
                        <option value="أبوظبي">أبوظبي</option>
                        <option value="دبي">دبي</option>
                        <option value="الشارقة">الشارقة</option>
                        <option value="عجمان">عجمان</option>
                        <option value="أم القيوين">أم القيوين</option>
                        <option value="رأس الخيمة">رأس الخيمة</option>
                        <option value="الفجيرة">الفجيرة</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                  </form>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">طلباتي</h2>
                  
                  {loadingOrders ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">لا توجد طلبات حتى الآن</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* This would normally display real orders, but for this example we'll show placeholder data */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm text-gray-500">رقم الطلب:</span>
                              <span className="font-bold mr-2">#1234</span>
                            </div>
                            <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">
                              تم التسليم
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center mb-4">
                            <img 
                              src="https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                              alt="عسل السدر" 
                              className="w-16 h-16 object-cover rounded ml-4"
                            />
                            <div>
                              <h3 className="font-medium">عسل السدر الطبيعي</h3>
                              <p className="text-sm text-gray-500">500 جرام × 2</p>
                            </div>
                          </div>
                          <div className="flex justify-between pt-4 border-t">
                            <span className="text-gray-600">15 يونيو 2023</span>
                            <span className="font-bold">230 درهم</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">المفضلة</h2>
                  
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">لا توجد منتجات في المفضلة</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;