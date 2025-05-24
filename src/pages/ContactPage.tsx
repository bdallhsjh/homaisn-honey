import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update page title
  useEffect(() => {
    document.title = 'اتصل بنا | عسل العطار';
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data:', data);
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
    }, 1000);
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">اتصل بنا</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full ml-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">الهاتف</h3>
                    <p className="text-gray-600 dir-ltr">+971 56 754 1300</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full ml-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@alattarhoney.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full ml-4">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">العنوان</h3>
                    <p className="text-gray-600">
                      الإمارات العربية المتحدة
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full ml-4">
                    <MessageCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">واتساب</h3>
                    <p className="text-gray-600 mb-2">تواصل معنا مباشرة عبر واتساب</p>
                    <a 
                      href="https://wa.me/971567541300" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      تواصل الآن
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold mb-3">تابعنا على</h3>
                <div className="flex space-x-4 space-x-reverse">
                  <a 
                    href="https://www.instagram.com/doan._honey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@alattarhoney?si=dhUFXZV1-aPsIz9U" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/16Y9RohbFP/?mibextid=qi2Omg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/AlattarHoney?t=IIWQo-BSxA78KEVfxCMSHQ&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">راسلنا</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p>
                    شكراً للتواصل معنا. سنقوم بالرد عليك في أقرب وقت ممكن.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">الاسم الكامل *</label>
                    <input
                      id="name"
                      type="text"
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">الاسم الكامل مطلوب</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني *</label>
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
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        id="phone"
                        type="tel"
                        className="input-field"
                        {...register('phone')}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة *</label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                      {...register('message', { required: true })}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">الرسالة مطلوبة</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full md:w-auto px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">موقعنا</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Placeholder for map - would be replaced with actual Google Maps integration */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">سيتم عرض الخريطة هنا</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;