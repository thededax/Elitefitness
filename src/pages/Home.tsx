import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import MagneticButton from '../components/MagneticButton';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import Marquee from '../components/Marquee';
import Tilt from 'react-parallax-tilt';
import BlogSection from '../components/BlogSection';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Helmet>
        <title>Elite Zumba & Fitness Studio | Bhagalpur's Premier Gym</title>
        <meta name="description" content="Join Bhagalpur's premier fitness sanctuary. Daily Zumba, Strength Training & Personal Training. 500+ active members, 4.9★ Google rating. Book your free trial today." />
      </Helmet>
      {/* HERO SECTION — Redesigned for premium impact */}
      <section ref={heroRef} className="relative min-h-[82vh] md:min-h-screen flex items-center overflow-hidden bg-background-dark py-12 md:py-0">
        {/* Background Image with Parallax — dark gym atmosphere */}
        <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <img 
            src="/images/hero-1.png"
            alt="Elite Fitness Studio Interior" 
            className="w-full h-full object-cover object-center scale-105 md:scale-100 transition-transform duration-700"
          />
          {/* Multi-layer overlay for depth, contrast, and mobile text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/70 sm:via-background-dark/80 to-background-dark/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/30"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 px-6 lg:px-24 w-full pt-24 md:pt-0">
          <div className="flex flex-col gap-0 max-w-5xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-sm mb-6 md:mb-8 flex items-center gap-4"
            >
              <span className="w-8 md:w-12 h-[2px] bg-primary"></span>
              Bhagalpur's Premier Fitness Sanctuary
            </motion.span>
            
            <h1>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block text-[11vw] md:text-[10vw] lg:text-[9rem] font-headline leading-[0.85] tracking-tighter text-white"
              >
                WHERE LIMITS
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block text-[11vw] md:text-[10vw] lg:text-[9rem] font-headline leading-[0.85] tracking-tighter text-white"
              >
                GO TO <span className="text-primary italic">DIE.</span>
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 md:mt-8 text-slate-400 text-sm md:text-lg lg:text-xl max-w-xl leading-relaxed font-light"
            >
              Zumba. Strength. Transformation. Join 500+ members who chose to stop making excuses and start making progress.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start gap-4 md:gap-6"
            >
              <MagneticButton>
                <Link to="/contact" className="group relative overflow-hidden bg-primary px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-sm font-bold uppercase tracking-widest-plus transition-all hover:pr-12 md:hover:pr-16 inline-block text-white">
                  <span className="relative z-10">Book Free Trial</span>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-sm md:text-base">arrow_forward</span>
                </Link>
              </MagneticButton>
              <a 
                href="https://wa.me/919065516492" 
                className="group flex items-center gap-3 border border-white/20 px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-sm font-bold uppercase tracking-widest-plus hover:border-primary hover:bg-primary/10 transition-all text-white"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 fill-current text-[#25D366] group-hover:text-primary transition-colors" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                <span>WhatsApp Us</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Trust Strip — overlapping hero bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-30"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
              <div className="p-2.5 md:p-6 border-r border-white/5 text-center md:text-left">
                <div className="text-xl md:text-3xl font-headline text-white leading-none">500+</div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Active Members</div>
              </div>
              <div className="p-2.5 md:p-6 border-r border-white/5 text-center md:text-left">
                <div className="text-xl md:text-3xl font-headline text-primary leading-none">6+</div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Years Strong</div>
              </div>
              <div className="p-2.5 md:p-6 border-r border-white/5 text-center md:text-left">
                <div className="text-xl md:text-3xl font-headline text-white leading-none flex items-center justify-center md:justify-start gap-1">4.9 <span className="material-symbols-outlined text-primary text-base md:text-lg fill-1">star</span></div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Google Rating</div>
              </div>
              <div className="p-2.5 md:p-6 text-center md:text-left">
                <div className="text-xl md:text-3xl font-headline text-white leading-none">25+</div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Daily Classes</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-6 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Smooth Gradient Divider: Hero -> Marquee */}
      <div className="w-full h-12 -mt-6 bg-gradient-to-b from-background-dark via-background-dark/90 to-primary/80 relative z-30 pointer-events-none"></div>

      {/* Marquee Strip with soft gradient overlay */}
      <div className="w-full bg-gradient-to-r from-primary via-[#e62828] to-primary py-4 overflow-hidden relative z-20 shadow-[0_0_50px_rgba(255,46,46,0.3)]">
        <Marquee 
          items={["DEFY LIMITS", "ELEVATE PERFORMANCE", "PURE ENERGY", "THE ELITE STANDARD"]} 
          className="text-white/40"
          speed={30}
        />
      </div>

      {/* Smooth Gradient Divider: Marquee -> About */}
      <div className="w-full h-16 bg-gradient-to-b from-primary/80 via-background-dark/90 to-background-dark relative z-20 pointer-events-none"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-background-dark relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative w-full"
          >
            <div className="absolute -top-6 md:-top-12 -left-4 md:-left-12 text-[4rem] md:text-[10rem] font-headline text-white/[0.03] select-none">HERITAGE</div>
            {/* PLACEHOLDER — replace with real photo: wide shot of Elite gym members during a workout session in Bhagalpur studio */}
            <ImageWithSkeleton alt="Elite Community" className="relative z-10 w-full aspect-[16/9] md:aspect-square object-cover magazine-shadow" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" />
            <div className="absolute -bottom-3 md:-bottom-6 -right-3 md:-right-6 w-1/2 h-1/2 bg-primary/20 -z-10 border border-primary/40 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:pl-12 mt-6 lg:mt-0"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[9px] md:text-xs mb-3 md:mb-4 block">Since 2018</span>
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-headline text-white leading-none mb-4 md:mb-8">BUILT BY<br/><span className="text-primary">PASSION</span></h2>
            <p className="text-slate-400 text-xs md:text-lg leading-relaxed mb-6 md:mb-8">From a small studio to Bhagalpur's most advanced fitness destination, Elite has always been about more than just lifting weights. It's about a community that pushes each other to be better every single day.</p>
            <Link to="/about" className="inline-flex items-center gap-3 md:gap-4 group">
              <span className="bg-primary px-5 md:px-8 py-3 md:py-4 text-[9px] md:text-xs font-bold uppercase tracking-widest-plus text-white group-hover:bg-white group-hover:text-primary transition-all">Read Full Story</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform text-sm md:text-base">east</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Smooth Gradient Divider: About -> Disciplines */}
      <div className="w-full h-16 bg-gradient-to-b from-background-dark via-background-dark/60 to-surface pointer-events-none -mb-1 relative z-10"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-surface relative" id="programs">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 md:mb-20 gap-3 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-5xl lg:text-7xl font-headline text-white uppercase">Elite<br/><span className="text-primary">Disciplines</span></h2>
            </motion.div>
            <Link to="/programs" className="text-[9px] md:text-xs font-bold uppercase tracking-widest-plus border-b-2 border-primary pb-1 md:pb-2 hover:text-primary transition-colors">View All Programs</Link>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { title: 'ZUMBA', subtitle: 'Cardio Dance Party', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop', mt: '' },
              { title: 'STRENGTH', subtitle: 'Power & Hypertrophy', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop', mt: 'md:mt-16' },
              { title: 'PERSONAL', subtitle: '1-on-1 Transformation', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop', mt: '' }
            ].map((program, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`shrink-0 w-[80vw] sm:w-[60vw] md:w-auto snap-center ${program.mt}`}
              >
                <Tilt 
                  tiltMaxAngleX={10} 
                  tiltMaxAngleY={10} 
                  perspective={1000} 
                  transitionSpeed={1000} 
                  scale={1.02}
                  className="group relative overflow-hidden aspect-[3/4] h-full"
                >
                  <ImageWithSkeleton alt={program.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src={program.img} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h4 className="text-3xl md:text-4xl font-headline text-white mb-2" style={{ transform: "translateZ(50px)" }}>{program.title}</h4>
                    <p className="text-slate-300 text-[10px] md:text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{program.subtitle}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smooth Gradient Divider: Disciplines -> Gallery */}
      <div className="w-full h-16 bg-gradient-to-b from-surface via-surface/60 to-background-dark pointer-events-none -mb-1 relative z-10"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-background-dark overflow-hidden" id="gallery">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-full px-4"
            >
              <h2 className="text-4xl md:text-7xl lg:text-[10rem] font-headline text-white tracking-tighter leading-none mb-4 md:mb-8 glow-red">THE STUDIO</h2>
              <MagneticButton>
                <Link to="/gallery" className="inline-block bg-primary text-white px-6 md:px-12 py-3 md:py-5 text-[9px] md:text-sm font-bold uppercase tracking-widest-plus hover:scale-105 transition-all magazine-shadow">Enter The Gallery</Link>
              </MagneticButton>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 opacity-40 w-full max-w-6xl">
              <ImageWithSkeleton alt="Gallery 1" className="w-full aspect-square object-cover" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" />
              <ImageWithSkeleton alt="Gallery 2" className="w-full aspect-[3/4] object-cover mt-4 md:mt-12" src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" />
              <ImageWithSkeleton alt="Gallery 3" className="w-full aspect-square object-cover" src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop" />
              <ImageWithSkeleton alt="Gallery 4" className="w-full aspect-[3/4] object-cover mt-4 md:mt-12" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Gradient Divider: Gallery -> Reviews */}
      <div className="w-full h-16 bg-gradient-to-b from-background-dark via-background-dark/60 to-surface pointer-events-none -mb-1 relative z-10"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-surface relative" id="reviews">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-primary fill-1 text-xl md:text-3xl">star</span>)}
            </div>
            <h2 className="text-3xl md:text-6xl font-headline text-white mb-3 md:mb-6 leading-none">ELITE<br/><span className="text-primary">RESULTS</span></h2>
            <p className="text-slate-400 mb-5 md:mb-8 text-[10px] md:text-base">Bhagalpur's highest-rated fitness community with a 4.9/5 star average across 500+ reviews.</p>
            <Link to="/reviews" className="inline-block bg-transparent border border-white/20 px-5 md:px-8 py-2 md:py-4 text-[9px] md:text-xs font-bold uppercase tracking-widest-plus hover:bg-primary hover:border-primary transition-all">See All Reviews</Link>
          </motion.div>
          <div className="lg:col-span-8 flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6 }}
              className="glass-card p-4 md:p-10 relative mt-0 md:mt-8 shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-center"
            >
              <span className="material-symbols-outlined absolute -top-3 -left-3 md:-top-4 md:-left-4 text-3xl md:text-5xl text-primary opacity-50">format_quote</span>
              <p className="text-slate-300 italic mb-4 md:mb-6 leading-relaxed text-xs md:text-base">"The environment here is electric. Best equipment in Bihar and the trainers actually care about your progress."</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700"></div>
                <div>
                  <h5 className="text-white font-bold text-[10px] md:text-sm uppercase">Rahul Sharma</h5>
                  <p className="text-primary text-[8px] md:text-[10px] uppercase font-bold tracking-widest">Member for 2 Years</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-4 md:p-10 relative shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-center"
            >
              <span className="material-symbols-outlined absolute -top-3 -left-3 md:-top-4 md:-left-4 text-3xl md:text-5xl text-primary opacity-50">format_quote</span>
              <p className="text-slate-300 italic mb-4 md:mb-6 leading-relaxed text-xs md:text-base">"Zumba sessions are the highlight of my day. Incredible energy and a very supportive female-friendly atmosphere."</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700"></div>
                <div>
                  <h5 className="text-white font-bold text-[10px] md:text-sm uppercase">Priya Singh</h5>
                  <p className="text-primary text-[8px] md:text-[10px] uppercase font-bold tracking-widest">Zumba Regular</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smooth Gradient Divider: Reviews -> Blog */}
      <div className="w-full h-16 bg-gradient-to-b from-surface via-surface/60 to-[#0a0a0a] pointer-events-none -mb-1 relative z-10"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-[#0a0a0a] relative" id="blog">
        <BlogSection />
      </section>

      {/* Smooth Gradient Divider: Blog -> Contact */}
      <div className="w-full h-16 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-background-dark pointer-events-none -mb-1 relative z-10"></div>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-background-dark relative" id="contact">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden magazine-shadow">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-primary p-6 md:p-12 lg:p-24 flex flex-col justify-center relative"
          >
            <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10">
              <span className="material-symbols-outlined text-[4rem] md:text-[10rem]">map</span>
            </div>
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-headline text-white mb-4 md:mb-8 leading-none">VISIT THE<br/>SANCTUARY</h2>
            <p className="text-white/80 text-xs md:text-lg mb-6 md:mb-12 max-w-md">Located in the heart of Bhagalpur, our 5,000 sq.ft facility is ready to welcome you. Start your journey today.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/contact" className="bg-white text-primary px-6 md:px-12 py-3 md:py-5 text-[9px] md:text-sm font-bold uppercase tracking-widest-plus hover:bg-black hover:text-white transition-all text-center">Contact Now</Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-6 md:px-12 py-3 md:py-5 text-[9px] md:text-sm font-bold uppercase tracking-widest-plus hover:bg-white hover:text-primary transition-all text-center">Visit Us</Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-surface relative min-h-[200px] md:min-h-[400px]"
          >
            <div className="absolute inset-0 opacity-70">
              <iframe allowFullScreen height="100%" loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5866750345674!2d86.9719369150119!3d25.24151798387431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f04bc225c5d33f%3A0xc66513233346d03d!2sElite%20Fitness!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin" style={{border:0}} width="100%"></iframe>
            </div>
            <div className="absolute bottom-3 md:bottom-8 left-3 md:left-8 p-3 md:p-6 glass-card border-primary/50">
              <h4 className="text-white font-headline text-lg md:text-2xl mb-1 md:mb-2">SAVITRI TOWER</h4>
              <p className="text-slate-400 text-[9px] md:text-xs uppercase tracking-widest">5th Floor, Kotwali Chowk<br/>Bhagalpur, Bihar</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smooth Gradient Divider: Contact -> Final CTA */}
      <div className="w-full h-16 bg-gradient-to-b from-background-dark via-background-dark/80 to-primary pointer-events-none -mb-1 relative z-10"></div>

      <section className="relative py-6 sm:py-10 md:py-24 px-4 md:px-6 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-6xl lg:text-[10rem] font-headline text-white tracking-tighter leading-none mb-4 select-none opacity-20 absolute -top-2 md:-top-12 left-0 right-0">NO EXCUSES</h2>
          <div className="flex flex-col items-center gap-3 md:gap-8 pt-4 md:pt-12">
            <h3 className="text-2xl md:text-4xl lg:text-6xl font-headline text-white uppercase tracking-wide">Ready to claim your spot?</h3>
            <p className="text-white/80 font-medium max-w-xl text-sm md:text-lg">Join 500+ members who have already transformed their lives at Elite Fitness. Your first session is on us.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-2 md:mt-4 w-full sm:w-auto">
              <Link to="/contact" className="bg-white text-primary hover:bg-black hover:text-white transition-all px-6 md:px-12 py-3 md:py-5 text-[9px] md:text-sm font-bold uppercase tracking-widest-plus text-center">
                Join Gym Today
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all px-6 md:px-12 py-3 md:py-5 text-[9px] md:text-sm font-bold uppercase tracking-widest-plus text-center">
                Book Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
