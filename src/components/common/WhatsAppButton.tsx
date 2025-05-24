import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '971567541300'; // UAE Format for +971 56 754 1300

  const handleWhatsAppClick = () => {
    // Track click event with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_button',
      });
    }
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  // Ensure gtag is defined on the window
  useEffect(() => {
    // Add typings for gtag
    if (typeof window !== 'undefined' && !window.gtag) {
      window.gtag = function() {
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };
    }
  }, []);

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-float"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

// Add gtag to Window interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default WhatsAppButton;