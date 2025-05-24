// Global type definitions

// Google Analytics
interface Window {
  gtag: (
    command: string,
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}