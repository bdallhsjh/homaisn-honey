import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://lxbotkvbcpnkxdtmxoyy.supabase.co/storage/v1/object/public/product-images//luxurious_honey_background_resized.png',
    title: 'عسل طبيعي 100%',
    description: 'اكتشف مجموعتنا الفاخرة من العسل الطبيعي النقي'
  },
  {
    id: 2,
    image: 'https://lxbotkvbcpnkxdtmxoyy.supabase.co/storage/v1/object/public/product-images//logo7.jpg.png',
    title: 'جودة استثنائية',
    description: 'نقدم أفضل أنواع العسل من أجود المناحل'
  },
  {
    id: 3,
    image: 'https://lxbotkvbcpnkxdtmxoyy.supabase.co/storage/v1/object/public/product-images//logo6.jpg',
    title: 'توصيل لجميع الإمارات',
    description: 'نوصل منتجاتنا إلى باب منزلك في جميع أنحاء الإمارات'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="container-custom h-full flex items-center">
              <div className="text-white md:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-honey-drip">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/products" 
                    className="btn-primary"
                  >
                    تسوق الآن
                  </Link>
                  <Link to="/about" className="btn-secondary text-white border-white hover:bg-white hover:text-primary-500">
                    تعرف علينا
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-6'
                : 'bg-white bg-opacity-50'
            }`}
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
        aria-label="الشريحة السابقة"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
        aria-label="الشريحة التالية"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
    </section>
  );
};

export default HeroSection;