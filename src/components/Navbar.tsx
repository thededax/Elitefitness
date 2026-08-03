import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { NavBar } from './ui/tubelight-navbar';
import { Home, User, Dumbbell, Image as ImageIcon, Star, Mail } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Programs', url: '/programs', icon: Dumbbell },
    { name: 'Gallery', url: '/gallery', icon: ImageIcon },
    { name: 'Reviews', url: '/reviews', icon: Star },
    { name: 'Contact', url: '/contact', icon: Mail },
  ];

  return (
    <>
      <header
        className={`fixed top-0 lg:top-0 z-50 w-full flex items-center justify-center lg:justify-between px-4 lg:px-12 py-4 lg:py-6 transition-all duration-300 ${
          isScrolled ? 'bg-background-dark/90 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-transparent mix-blend-difference lg:mix-blend-difference'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-primary text-3xl lg:text-4xl fill-1">fitness_center</span>
          <h2 className="text-white text-2xl lg:text-3xl font-headline tracking-widest uppercase">ELITE</h2>
        </Link>
  
        <div className="hidden lg:flex items-center gap-12">
          <MagneticButton>
            <Link to="/contact" className="bg-primary hover:bg-white hover:text-primary transition-all px-8 py-3 text-xs font-bold uppercase tracking-widest-plus text-white inline-block">
              Join The Elite
            </Link>
          </MagneticButton>
        </div>
  
        <NavBar items={navLinks} className="hidden lg:block sm:top-0" />
      </header>
      <NavBar items={navLinks} className="lg:hidden" />
    </>
  );
}
