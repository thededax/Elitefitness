import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { selectProgramAndScroll } from '../lib/funnelState';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-canvas,#080808)]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary,#D70015)] flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(215,0,21,0.4)]">
            <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-widest leading-none block">
              ELITE
            </span>
            <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[var(--accent-secondary,#FF2E44)] font-bold block">
              FITNESS & ZUMBA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — 4 Core Destinations with High Typographic Precision */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-xs font-mono font-bold uppercase tracking-[0.22em] transition-colors py-1 ${
                  isActive ? 'text-white' : 'text-[var(--text-secondary,#A0A0A0)] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[var(--accent-primary,#D70015)] transition-all duration-300 ${
                    isActive ? 'w-full shadow-[0_0_10px_rgba(215,0,21,0.9)]' : 'w-0 hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Cluster */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://wa.me/919065516492"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Concierge"
            className="w-10 h-10 rounded-lg border border-white/10 bg-[var(--bg-surface,#121212)] flex items-center justify-center text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
          </a>

          <button
            onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')}
            className="px-5 py-2.5 rounded-lg text-xs font-mono font-extrabold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.35)] active:scale-95 flex items-center gap-1.5"
          >
            <span>Claim 3-Day Pass</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Mobile Hamburger Drawer Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')}
            className="sm:hidden px-3 py-1.5 rounded-md text-[11px] font-mono font-bold uppercase bg-[var(--accent-primary,#D70015)] text-white shadow-md"
          >
            Trial Pass
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Drawer"
            className="p-2 rounded-lg bg-[var(--bg-surface,#121212)] border border-white/10 text-white hover:text-[var(--accent-primary,#D70015)]"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-canvas,#080808)]/98 border-b border-white/10 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-base font-display font-bold uppercase tracking-wider py-1.5 border-b border-white/5 flex items-center justify-between transition-colors ${
                    isActive ? 'text-[var(--accent-primary,#D70015)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-primary,#D70015)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-sm text-[var(--text-muted)]">east</span>
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  selectProgramAndScroll('3-Day Free Trial Pass');
                }}
                className="w-full py-3.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white shadow-lg flex items-center justify-center gap-2"
              >
                <span>Claim Free 3-Day Trial Pass</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <a
                href="https://wa.me/919065516492"
                className="w-full py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[#25D366] text-white flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp (+91 90655 16492)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
