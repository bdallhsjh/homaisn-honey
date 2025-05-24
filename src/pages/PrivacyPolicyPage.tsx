import { useEffect } from 'react';

const PrivacyPolicyPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'سياسة الخصوصية | عسل العطار';
  }, []);

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">سياسة الخصوصية</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              مرحبًا بك في سياسة الخصوصية الخاصة بموقع عسل العطار. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. المعلومات التي نجمعها</h2>
            <p className="mb-4">
              نحن نجمع المعلومات التالية:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">معلومات التسجيل: مثل الاسم والبريد الإلكتروني وكلمة المرور.</li>
              <li className="mb-2">معلومات الملف الشخصي: مثل رقم الهاتف والعنوان.</li>
              <li className="mb-2">معلومات الطلب: تفاصيل المنتجات التي تشتريها وتاريخ الشراء والمبلغ المدفوع.</li>
              <li className="mb-2">معلومات الدفع: لا نقوم بتخزين معلومات بطاقات الائتمان أو الحسابات البنكية.</li>
              <li className="mb-2">بيانات التصفح: مثل عنوان IP والمتصفح ونظام التشغيل.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. كيفية استخدام المعلومات</h2>
            <p className="mb-4">
              نستخدم المعلومات التي نجمعها للأغراض التالية:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">توفير وإدارة حسابك في الموقع.</li>
              <li className="mb-2">معالجة وتسليم طلباتك.</li>
              <li className="mb-2">التواصل معك بخصوص طلباتك أو استفساراتك.</li>
              <li className="mb-2">تحسين خدماتنا ومنتجاتنا.</li>
              <li className="mb-2">إرسال نشرات إخبارية وعروض ترويجية (إذا اخترت الاشتراك).</li>
              <li className="mb-2">الالتزام بالمتطلبات القانونية.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. مشاركة المعلومات</h2>
            <p className="mb-4">
              لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">مع شركات الشحن والتوصيل لتسليم طلباتك.</li>
              <li className="mb-2">مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا وخدمة العملاء.</li>
              <li className="mb-2">عند الضرورة للامتثال للقانون أو حماية حقوقنا أو سلامة الآخرين.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. أمان المعلومات</h2>
            <p className="mb-4">
              نتخذ تدابير أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام غير المناسب. نستخدم بروتوكولات تشفير قياسية لحماية نقل البيانات.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. ملفات تعريف الارتباط (الكوكيز)</h2>
            <p className="mb-4">
              نستخدم ملفات تعريف الارتباط وتقنيات مماثلة لتحسين تجربة التصفح وتحليل استخدام الموقع وتخصيص المحتوى. يمكنك ضبط إعدادات المتصفح لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على بعض وظائف الموقع.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. حقوقك</h2>
            <p className="mb-4">
              لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية، بما في ذلك:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">الوصول إلى معلوماتك الشخصية.</li>
              <li className="mb-2">تصحيح معلوماتك غير الدقيقة.</li>
              <li className="mb-2">حذف معلوماتك في ظروف معينة.</li>
              <li className="mb-2">الاعتراض على معالجة معلوماتك.</li>
              <li className="mb-2">إلغاء الاشتراك في الرسائل التسويقية.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. التغييرات على سياسة الخصوصية</h2>
            <p className="mb-4">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عن طريق نشر السياسة المحدثة على موقعنا.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. اتصل بنا</h2>
            <p className="mb-4">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">البريد الإلكتروني: info@alattarhoney.com</li>
              <li className="mb-2">الهاتف: +971 56 754 1300</li>
            </ul>
            
            <p className="mt-8 text-sm text-gray-500">
              آخر تحديث: 15 أكتوبر 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;