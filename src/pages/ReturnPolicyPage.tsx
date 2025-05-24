import { useEffect } from 'react';

const ReturnPolicyPage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'سياسة الإرجاع والاسترداد | عسل العطار';
  }, []);

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">سياسة الإرجاع والاسترداد</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              في عسل العطار، نحن ملتزمون بتقديم منتجات عالية الجودة وخدمة عملاء ممتازة. نحن نفهم أنه في بعض الأحيان قد تحتاج إلى إرجاع المنتج، لذلك وضعنا سياسة الإرجاع التالية.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. شروط الإرجاع</h2>
            <p className="mb-4">
              يمكنك إرجاع المنتجات في الحالات التالية:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">المنتج معيب أو تالف عند الاستلام.</li>
              <li className="mb-2">المنتج المستلم يختلف عما طلبته.</li>
              <li className="mb-2">المنتج منتهي الصلاحية أو على وشك الانتهاء.</li>
            </ul>
            
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <p className="text-amber-800">
                <strong>ملاحظة مهمة:</strong> نظرًا لطبيعة منتجاتنا (منتجات غذائية)، لا يمكننا قبول الإرجاع إذا تم فتح المنتج أو استخدامه، إلا إذا كان معيبًا.
              </p>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. فترة الإرجاع</h2>
            <p className="mb-4">
              يجب إخطارنا برغبتك في إرجاع المنتج خلال 7 أيام من تاريخ الاستلام. للقيام بذلك، يرجى التواصل معنا عبر:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">البريد الإلكتروني: info@alattarhoney.com</li>
              <li className="mb-2">الهاتف أو واتساب: +971 56 754 1300</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. عملية الإرجاع</h2>
            <p className="mb-4">
              خطوات إرجاع المنتج:
            </p>
            <ol className="list-decimal pr-6 mb-4">
              <li className="mb-2">اتصل بنا لإبلاغنا عن رغبتك في الإرجاع وسبب الإرجاع.</li>
              <li className="mb-2">سنقوم بتزويدك بتعليمات الإرجاع وقد نطلب صورًا للمنتج.</li>
              <li className="mb-2">قم بتغليف المنتج بشكل آمن في عبوته الأصلية إن أمكن.</li>
              <li className="mb-2">سنقوم بترتيب استلام المنتج أو قد نطلب منك إرساله إلينا.</li>
            </ol>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. الاسترداد</h2>
            <p className="mb-4">
              بمجرد استلام المنتج المرتجع وتأكيد حالته، سنقوم بمعالجة الاسترداد على النحو التالي:
            </p>
            <ul className="list-disc pr-6 mb-4">
              <li className="mb-2">استبدال المنتج بمنتج مماثل (إذا كان متوفرًا).</li>
              <li className="mb-2">استرداد كامل المبلغ إذا كان المنتج معيبًا أو تم شحن منتج خاطئ.</li>
              <li className="mb-2">في حالة الاسترداد النقدي، سيتم إعادة المبلغ بنفس طريقة الدفع الأصلية.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. تكاليف الإرجاع</h2>
            <p className="mb-4">
              إذا كان سبب الإرجاع خطأ من جانبنا (منتج معيب، منتج خاطئ)، فسنتحمل تكاليف الإرجاع. في الحالات الأخرى، قد يتم خصم تكاليف الشحن من المبلغ المسترد.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. حالات خاصة</h2>
            <p className="mb-4">
              في بعض الحالات الخاصة، قد نقدم حلولًا بديلة مثل الخصومات على المشتريات المستقبلية أو قسائم هدايا. سيتم تقييم كل حالة على حدة.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. الاتصال بنا</h2>
            <p className="mb-4">
              إذا كان لديك أي أسئلة حول سياسة الإرجاع والاسترداد، يرجى التواصل معنا:
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

export default ReturnPolicyPage;