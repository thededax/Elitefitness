import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-15, 10]);

  return (
    <footer ref={footerRef} className="relative bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)] pt-10 sm:pt-16 md:pt-24 pb-24 sm:pb-28 md:pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-8 sm:gap-12 md:gap-16">
        
        {/* Top Section: Tagline + Navigation Columns */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-10 lg:gap-16">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[var(--bg-surface,#121212)] text-[var(--accent-secondary,#FF2E44)] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <span>Bhagalpur's Premier Fitness Sanctuary</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase leading-none mb-3 sm:mb-4">
              ENGINEER YOUR <br />
              <span className="text-[var(--accent-primary,#D70015)]">STRONGEST SELF.</span>
            </h3>
            <p className="text-[var(--text-secondary,#A0A0A0)] text-xs sm:text-sm leading-relaxed font-normal">
              5,000 sq.ft state-of-the-art facility featuring Olympic platforms, calibrated plates, high-energy Zumba, and certified coaching mentorship.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto">
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-widest mb-4 text-[var(--accent-secondary,#FF2E44)]">
                EXPLORE
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-[var(--text-secondary,#A0A0A0)] uppercase tracking-wider">
                <li><a href="/#programs-bento" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="/#schedule" className="hover:text-white transition-colors">Timetable</a></li>
                <li><a href="/#trainers" className="hover:text-white transition-colors">Coaches</a></li>
                <li><a href="/#bmi-calculator" className="hover:text-white transition-colors">BMI Diagnostic</a></li>
                <li><a href="/#pricing" className="hover:text-white transition-colors">Memberships</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-widest mb-4 text-[var(--accent-secondary,#FF2E44)]">
                SANCTUARY
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-[var(--text-secondary,#A0A0A0)] uppercase tracking-wider">
                <li><Link to="/login?mode=signin" className="text-white hover:text-[var(--accent-secondary,#FF2E44)] transition-colors">Member Sign In</Link></li>
                <li><Link to="/login?mode=signup" className="text-[var(--accent-secondary,#FF2E44)] hover:text-white transition-colors font-bold">Join / Sign Up</Link></li>
                <li><Link to="/check-in" className="hover:text-white transition-colors">Entrance QR Check-In</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Wall of Fame</Link></li>
                <li><a href="https://wa.me/919065516492" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Desk</a></li>
                <li><a href="tel:+919065516492" className="hover:text-white transition-colors">Call Direct</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-widest mb-4 text-[var(--accent-secondary,#FF2E44)]">
                HOURS & LOCATION
              </h4>
              <div className="text-xs font-mono text-[var(--text-secondary,#A0A0A0)] space-y-1.5 leading-relaxed">
                <p className="text-white font-semibold">Savitri Tower, 5th Floor</p>
                <p>Above Vishal Mega Mart, Kotwali Chowk, Bhagalpur</p>
                <p className="text-[var(--accent-secondary,#FF2E44)] font-bold pt-1">Mon – Sat: 6:00 AM – 10:00 PM</p>
                <p>Sunday: 8:00 AM – 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: High-Contrast Display Wordmark */}
        <motion.div style={{ y }} className="w-full flex justify-center py-4 sm:py-6 my-1 sm:my-2 border-y border-white/5 overflow-hidden">
          <h2 className="text-[15vw] sm:text-[18vw] md:text-[18vw] lg:text-[19vw] xl:text-[230px] font-display font-extrabold tracking-tighter uppercase leading-[0.75] text-white/95 hover:text-white transition-colors text-center select-none w-full flex items-center justify-center gap-1 md:gap-3 max-w-full">
            <span>ELI</span>
            <span style={{ WebkitTextStroke: '2px rgba(215, 0, 21, 0.75)', color: 'transparent' }}>TE</span>
            <span className="w-2 sm:w-3 md:w-6 h-2 sm:h-3 md:h-6 rounded-full bg-[var(--accent-primary,#D70015)] inline-block self-baseline mt-2 sm:mt-4 md:mt-8 ml-0.5 sm:ml-1 shadow-[0_0_25px_rgba(215,0,21,0.9)]"></span>
          </h2>
        </motion.div>

        {/* Bottom Bar: Brand Logo & Legal Copyright */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs font-mono text-[var(--text-muted)] text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-xl">fitness_center</span>
              <span className="text-white text-sm sm:text-base font-display font-bold tracking-widest uppercase">ELITE FITNESS</span>
            </Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-[10px] uppercase tracking-wider">
              © {new Date().getFullYear()} Elite Zumba & Fitness Studio. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] font-mono">
            <a href="https://wa.me/919065516492" className="hover:text-[var(--accent-secondary,#FF2E44)] transition-colors">WhatsApp</a>
            <a href="tel:+919065516492" className="hover:text-[var(--accent-secondary,#FF2E44)] transition-colors">+91 90655 16492</a>
            <span className="text-[var(--text-muted)]">Bhagalpur, Bihar</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
