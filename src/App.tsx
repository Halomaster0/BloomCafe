import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Toaster from './components/Toaster';
import HeroSection from './sections/HeroSection';
import MenuSection from './sections/MenuSection';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import TableOrderSection from './sections/TableOrderSection';
import ReserveSection from './sections/ReserveSection';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';
import { CartProvider, useCart } from './CartContext';
import CartOverlay from './components/CartOverlay';
import ControllerView from './ControllerView';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const MenuSectionWrapper = () => {
  const { isMenuOpen } = useCart();
  return <MenuSection className={isMenuOpen ? 'z-[5000]' : 'z-30'} />;
};

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description?: string }>>([]);
  const [isStaffView, setIsStaffView] = useState(false);

  useEffect(() => {
    const handleRoute = () => {
      setIsStaffView(window.location.pathname === '/controller');
    };
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (isStaffView) {
    return <ControllerView />;
  }

  return (
    <CartProvider>
      <div ref={mainRef} className="relative">
        <div className="grain-overlay" />
        <Navigation />
        <Toaster toasts={toasts} dismissToast={dismissToast} />
        <CartOverlay />

        <main className="relative">
          <HeroSection className="z-10" />
          <TableOrderSection className="z-20" />
          <MenuSectionWrapper />
          <StorySection className="z-50" />
          <GallerySection className="z-60" />
          <ReserveSection className="z-70" />
          <ReviewsSection className="z-80" />
          <ContactSection className="z-90" />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
