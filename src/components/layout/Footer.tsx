import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import HoneyLogo from '../common/HoneyLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-amber-50 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <HoneyLogo className="h-10 w-auto text-amber-50" />
              <span className="text-xl font-bold mr-2">عسل العطار</span>
            </div>
            <p className="mb-4">نقدم أفضل أنواع العسل الطبيعي 100% من مناحل الإمارات والعالم.</p>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="https://www.instagram.com/doan._honey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/@alattarhoney?si=dhUFXZV1-aPsIz9U" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/16Y9RohbFP/?mibextid=qi2Omg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AlattarHoney?t=IIWQo-BSxA78KEVfxCMSHQ&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-300 transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-300 transition-colors">منتجاتنا</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-300 transition-colors">المدونة</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-300 transition-colors">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-300 transition-colors">اتصل بنا</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-primary-300 transition-colors">سياسة الخصوصية</Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-primary-300 transition-colors">سياسة الإرجاع والاسترداد</Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/971567541300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-300 transition-colors"
                >
                  تواصل عبر واتساب
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <p className="mb-2">الإمارات العربية المتحدة</p>
            <p className="mb-2 dir-ltr">+971 56 754 1300</p>
            <p className="mb-4">info@alattarhoney.com</p>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-6">
          <p className="text-center text-sm">
            &copy; {currentYear} عسل العطار. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;