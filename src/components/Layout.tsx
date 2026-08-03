import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex-1 flex flex-col relative"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      
      {/* Fixed Contact Bar */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] flex flex-col gap-3 md:gap-4">
        <a className="group flex items-center justify-center bg-green-600 hover:bg-green-500 text-white w-14 h-14 rounded-full transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.6)] hover:scale-110 relative" href="https://wa.me/919065516492">
          <span className="material-symbols-outlined text-2xl">chat</span>
          <span className="absolute right-full mr-4 bg-background-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">WhatsApp Us</span>
        </a>
        <a className="group flex items-center justify-center bg-primary hover:bg-white hover:text-primary text-white w-14 h-14 rounded-full transition-all shadow-[0_0_20px_rgba(255,46,46,0.4)] hover:shadow-[0_0_25px_rgba(255,46,46,0.6)] hover:scale-110 relative" href="tel:+919065516492">
          <span className="material-symbols-outlined text-2xl">call</span>
          <span className="absolute right-full mr-4 bg-background-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Call Now</span>
        </a>
      </div>
    </div>
  );
}
