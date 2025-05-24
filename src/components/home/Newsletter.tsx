import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 bg-primary-500 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-1/4 w-30 h-30 rounded-full bg-white"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">انضم إلى عائلة عسل العطار</h2>
          <p className="mb-6">اشترك في نشرتنا البريدية للحصول على آخر العروض والأخبار</p>
          
          {isSubmitted ? (
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p>شكراً لاشتراكك! سنبقيك على اطلاع بكل جديد.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-800 hover:bg-amber-900 rounded-lg font-medium transition-colors duration-300 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? 'جاري الاشتراك...' : 'اشترك الآن'}
              </button>
            </form>
          )}
          
          <p className="mt-4 text-sm opacity-80">
            لن نشارك معلوماتك مع أي طرف ثالث ويمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;