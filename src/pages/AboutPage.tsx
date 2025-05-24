import { useEffect } from 'react';

const AboutPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'من نحن | عسل العطار';
  }, []);

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">من نحن</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="h-64 md:h-80">
              <img 
                src="https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="مناحل عسل العطار"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
              <p className="text-gray-700 mb-6">
                بدأت رحلة "عسل العطار" منذ أكثر من 15 عامًا، عندما قرر مؤسسنا أحمد العطار تحويل شغفه بالعسل الطبيعي إلى مهمة لتوفير أنقى وأجود أنواع العسل للعائلات في الإمارات العربية المتحدة.
              </p>
              <p className="text-gray-700 mb-6">
                بدأنا بمنحل صغير في جبال الإمارات، واليوم نفخر بامتلاك عدة مناحل في أفضل المناطق الطبيعية المحلية والعالمية، مما يضمن تنوع منتجاتنا وجودتها العالية.
              </p>
              <p className="text-gray-700">
                نحن في عسل العطار لا نبيع مجرد عسل، بل نقدم تجربة صحية متكاملة. التزامنا بالجودة والأصالة جعلنا الخيار الأول للعديد من العائلات التي تبحث عن منتجات طبيعية 100% خالية من المواد الحافظة والإضافات الصناعية.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-gray-700">
                أن نكون الشركة الرائدة في توفير منتجات العسل الطبيعي في الإمارات العربية المتحدة، ونشر الوعي حول فوائدها الصحية الهائلة، مع الحفاظ على البيئة وتعزيز التنمية المستدامة.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">رسالتنا</h2>
              <p className="text-gray-700">
                توفير أجود أنواع العسل الطبيعي 100% من مصادر مستدامة، والالتزام بأعلى معايير الجودة في كل خطوة من خطوات الإنتاج، مع تقديم خدمة عملاء استثنائية وتعزيز العلاقات طويلة الأمد مع عملائنا.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6">ما يميزنا</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 ml-4 flex-shrink-0">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">منتجات طبيعية 100%</h3>
                  <p className="text-gray-600">
                    نقدم عسلًا طبيعيًا خامًا بدون أي إضافات صناعية أو مواد حافظة.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 ml-4 flex-shrink-0">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">اختبارات الجودة</h3>
                  <p className="text-gray-600">
                    تخضع جميع منتجاتنا لاختبارات جودة صارمة لضمان أعلى معايير النقاء والسلامة.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 ml-4 flex-shrink-0">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">مصادر مستدامة</h3>
                  <p className="text-gray-600">
                    نحرص على العمل مع مناحل تتبع ممارسات صديقة للبيئة وتدعم استدامة النحل.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 ml-4 flex-shrink-0">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">خدمة عملاء متميزة</h3>
                  <p className="text-gray-600">
                    فريقنا جاهز دائمًا للإجابة على استفساراتكم وتقديم الدعم اللازم.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center bg-primary-50 p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">انضم إلى عائلة عسل العطار</h2>
            <p className="text-gray-700 mb-6">
              نشكرك على اهتمامك بمنتجاتنا ونتطلع إلى أن نكون جزءًا من رحلتك نحو نمط حياة صحي وطبيعي.
            </p>
            <button className="btn-primary">اتصل بنا</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;