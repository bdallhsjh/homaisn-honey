import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { jsPDF } from 'jspdf';

type ShippingFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
    document.title = 'إتمام الطلب | عسل العطار';
  }, [cart.length, navigate]);

  // Generate PDF invoice
  const generateInvoice = (formData: ShippingFormData) => {
    const doc = new jsPDF();
    
    // Add invoice header
    doc.setFontSize(22);
    doc.text('فاتورة عسل العطار', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-AE')}`, 20, 30);
    doc.text(`رقم الطلب: ${Math.floor(Math.random() * 10000)}`, 20, 38);
    
    // Customer info
    doc.setFontSize(14);
    doc.text('معلومات العميل', 105, 50, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`الاسم: ${formData.fullName}`, 20, 60);
    doc.text(`البريد الإلكتروني: ${formData.email}`, 20, 68);
    doc.text(`الهاتف: ${formData.phone}`, 20, 76);
    doc.text(`العنوان: ${formData.address}, ${formData.city}`, 20, 84);
    
    // Items table
    doc.setFontSize(14);
    doc.text('المنتجات', 105, 100, { align: 'center' });
    
    // Table headers
    doc.setFontSize(12);
    doc.text('المنتج', 20, 110);
    doc.text('الكمية', 100, 110);
    doc.text('السعر', 140, 110);
    doc.text('الإجمالي', 180, 110);
    
    doc.line(20, 115, 190, 115);
    
    // Table content
    let y = 125;
    cart.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`${item.price} درهم`, 140, y);
      doc.text(`${(item.price * item.quantity).toFixed(2)} درهم`, 180, y);
      y += 10;
    });
    
    doc.line(20, y, 190, y);
    y += 10;
    
    // Total
    doc.text('الإجمالي:', 140, y);
    doc.text(`${cartTotal.toFixed(2)} درهم`, 180, y);
    
    // Footer
    y += 30;
    doc.setFontSize(10);
    doc.text('شكراً لطلبك من عسل العطار. للاستفسار يرجى التواصل على +971 56 754 1300', 105, y, { align: 'center' });
    
    return doc.output('datauristring');
  };

  // Handle form submission
  const onSubmit = async (data: ShippingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Generate invoice
      const invoicePdf = generateInvoice(data);
      
      // Prepare WhatsApp message
      const items = cart.map(item => 
        `${item.name} (${item.weight}) - ${item.quantity} × ${item.price} درهم = ${(item.price * item.quantity).toFixed(2)} درهم`
      ).join('\n');
      
      const message = encodeURIComponent(
        `*طلب جديد من عسل العطار*\n\n` +
        `*معلومات العميل:*\n` +
        `الاسم: ${data.fullName}\n` +
        `البريد الإلكتروني: ${data.email}\n` +
        `الهاتف: ${data.phone}\n` +
        `العنوان: ${data.address}, ${data.city}\n` +
        `ملاحظات: ${data.notes || 'لا توجد'}\n\n` +
        `*المنتجات:*\n${items}\n\n` +
        `*الإجمالي:* ${cartTotal.toFixed(2)} درهم\n\n` +
        `*طريقة الدفع:* الدفع عند الاستلام`
      );
      
      // Track order completion with Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: new Date().getTime().toString(),
          value: cartTotal,
          currency: 'AED',
          items: cart.map(item => ({
            item_id: item.id.toString(),
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });
        
        // Track WhatsApp redirect
        window.gtag('event', 'whatsapp_click', {
          event_category: 'checkout',
          event_label: 'order_completion'
        });
      }
      
      // Clear cart
      clearCart();
      
      // Redirect to WhatsApp
      window.location.href = `https://wa.me/971567541300?text=${message}`;
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">معلومات التوصيل</h2>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700 mb-2">الاسم الكامل *</label>
                  <input
                    id="fullName"
                    type="text"
                    className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && (
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
                      defaultValue={user?.email || ''}
                    />
                    {errors.email?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1">البريد الإلكتروني مطلوب</p>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <p className="text-red-500 text-sm mt-1">يرجى إدخال بريد إلكتروني صحيح</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف *</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone', { 
                        required: true,
                        pattern: /^(?:\+971|00971|0)?(?:50|51|52|53|54|55|56|58|59)\d{7}$/
                      })}
                    />
                    {errors.phone?.type === 'required' && (
                      <p className="text-red-500 text-sm mt-1">رقم الهاتف مطلوب</p>
                    )}
                    {errors.phone?.type === 'pattern' && (
                      <p className="text-red-500 text-sm mt-1">يرجى إدخال رقم هاتف إماراتي صحيح</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">العنوان *</label>
                  <input
                    id="address"
                    type="text"
                    className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">العنوان مطلوب</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 mb-2">المدينة *</label>
                  <select
                    id="city"
                    className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                    {...register('city', { required: true })}
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
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">المدينة مطلوبة</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="notes" className="block text-gray-700 mb-2">ملاحظات إضافية</label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="input-field"
                    {...register('notes')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full block text-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري إتمام الطلب...' : 'إتمام الطلب'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
              
              <ul className="mb-6 divide-y">
                {cart.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {item.price} درهم
                      </p>
                    </div>
                    <span className="font-medium">
                      {(item.price * item.quantity).toFixed(2)} درهم
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">إجمالي المنتجات</span>
                  <span>{cartTotal.toFixed(2)} درهم</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">التوصيل</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>الإجمالي</span>
                  <span className="text-primary-600">{cartTotal.toFixed(2)} درهم</span>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <p className="text-amber-800">
                    بمجرد إتمام الطلب، سيتم إعادة توجيهك إلى واتساب لإكمال عملية الطلب.
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  طريقة الدفع: <span className="font-medium">الدفع عند الاستلام فقط</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;