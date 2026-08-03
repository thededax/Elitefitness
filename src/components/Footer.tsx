import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Smooth GPU-accelerated vertical parallax translateY
  const y = useTransform(scrollYProgress, [0, 1], [-15, 10]);

  return (
    <footer ref={footerRef} className="relative bg-[#080808] border-t border-white/10 pt-16 md:pt-24 pb-12 px-6 lg:px-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Top Section: Tagline + Navigation Columns */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-4xl font-headline text-white tracking-wide uppercase mb-4">
              TRANSFORM YOUR BODY.<br />
              <span className="text-primary italic">DEFY LIMITS.</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
              Transforming lives through elite movement, strength training, and high-performance living. Bhagalpur's premier fitness destination.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 lg:gap-20 w-full lg:w-auto">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Explore</h4>
              <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                <li><Link to="/programs" className="hover:text-primary transition-colors">Programs</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Support</h4>
              <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                <li><a href="https://wa.me/919065516492" className="hover:text-primary transition-colors">WhatsApp</a></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Location</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Newsletter</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Stay ahead of the game.</p>
              <div className="relative">
                <input 
                  className="bg-surface border border-white/10 w-full px-4 py-3 text-xs font-bold uppercase tracking-widest text-white focus:border-primary focus:ring-0 outline-none" 
                  placeholder="EMAIL ADDRESS" 
                  type="email" 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-1.5 hover:bg-white hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Massive High-Contrast Display Wordmark inspired by Antigravity */}
        <motion.div style={{ y }} className="w-full flex justify-center py-4 md:py-8 my-2 border-y border-white/5">
          <h1 className="text-[17vw] sm:text-[18vw] md:text-[18vw] lg:text-[19vw] xl:text-[260px] font-headline tracking-tighter uppercase leading-[0.75] text-white/95 hover:text-white transition-colors text-center select-none w-full flex items-center justify-center gap-1 md:gap-3">
            <span>ELI</span>
            <span style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)', color: 'transparent' }}>TE</span>
            <span className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-primary inline-block self-baseline mt-4 md:mt-8 ml-1 glow-red"></span>
          </h1>
        </motion.div>

        {/* Bottom Bar: Brand Logo & Legal Copyright */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
              <span className="text-white text-lg font-headline tracking-widest uppercase">ELITE</span>
            </Link>
            <span className="text-slate-700">|</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} ELITE FITNESS STUDIO. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">facebook</span>
            </a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">camera</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
