import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد',
    location: 'دبي، الإمارات',
    rating: 5,
    quote: 'من أفضل أنواع العسل التي تذوقتها في حياتي! طعم رائع وجودة عالية. سأطلب منكم دائمًا.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 2,
    name: 'فاطمة علي',
    location: 'أبوظبي، الإمارات',
    rating: 5,
    quote: 'أنا أستخدم عسل العطار يوميًا لصحتي وأطفالي. النتائج مذهلة والطعم لذيذ جدًا.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
  {
    id: 3,
    name: 'خالد أحمد',
    location: 'الشارقة، الإمارات',
    rating: 4,
    quote: 'منتج رائع وخدمة عملاء ممتازة. التوصيل كان سريعًا والتعبئة كانت احترافية جدًا.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-amber-50">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">ماذا يقول عملاؤنا</h2>
        
        <div className="relative">
          <div className="max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-primary-500 fill-primary-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 right-0 md:right-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="السابق"
          >
            <ChevronRight className="h-6 w-6 text-primary-500" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 left-0 md:left-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="التالي"
          >
            <ChevronLeft className="h-6 w-6 text-primary-500" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-primary-500 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;