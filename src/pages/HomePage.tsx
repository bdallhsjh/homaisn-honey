import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HoneyCategories from '../components/home/HoneyCategories';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'عسل العطار | منتجات عسل طبيعية';
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <HoneyCategories />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;