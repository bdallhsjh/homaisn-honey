import { Droplets, Truck, Award, Heart } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'عسل طبيعي 100%',
    description: 'نحن نضمن تقديم عسل خام ونقي بدون أي إضافات صناعية',
    icon: Droplets,
  },
  {
    id: 2,
    title: 'توصيل سريع',
    description: 'نوصل طلبك إلى باب منزلك في أسرع وقت ممكن',
    icon: Truck,
  },
  {
    id: 3,
    title: 'جودة مضمونة',
    description: 'منتجاتنا تخضع لاختبارات الجودة لضمان أفضل مذاق وفوائد',
    icon: Award,
  },
  {
    id: 4,
    title: 'دعم العملاء',
    description: 'فريق خدمة العملاء جاهز لمساعدتك في أي وقت',
    icon: Heart,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">لماذا تختار عسل العطار؟</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            
            return (
              <div 
                key={feature.id}
                className="text-center p-6 rounded-lg transition-all hover:shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;