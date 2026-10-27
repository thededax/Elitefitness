import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import Tilt from 'react-parallax-tilt';
import ClassSchedule from '../components/ClassSchedule';
import Pricing from '../components/Pricing';
import { selectProgramAndScroll } from '../lib/funnelState';

export default function Programs() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Helmet>
        <title>Programs & Pricing | Elite Zumba & Fitness Studio — Bhagalpur</title>
        <meta name="description" content="Explore Elite Fitness programs: Zumba, Strength Training, Personal Training, Weight Loss & more. View class schedule, membership pricing from ₹999/mo. Book your free trial." />
      </Helmet>
      <section ref={heroRef} className="w-full relative min-h-[45vh] md:min-h-[60vh] flex items-center overflow-hidden bg-background-dark">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* PLACEHOLDER — replace with real photo: Elite gym strength training zone, dramatic side lighting, barbells in foreground */}
          <img 
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Strength Training" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-background-dark/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/40"></div>
        </motion.div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16">
          <div className="flex flex-col gap-0 items-start max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold tracking-[0.25em] sm:tracking-[0.5em] uppercase text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4"
            >
              <span className="w-8 sm:w-12 h-[2px] bg-primary"></span>
              Elevate Your Performance
            </motion.span>
            <h1>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-4xl sm:text-7xl lg:text-[9rem] font-headline leading-[0.88] tracking-tighter text-white uppercase"
              >
                Our Elite
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block text-4xl sm:text-7xl lg:text-[9rem] font-headline leading-[0.88] tracking-tighter text-white uppercase"
              >
                <span className="text-primary italic">Programs</span>
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-4 sm:mt-6 md:mt-10 text-slate-400 text-sm sm:text-base md:text-xl max-w-2xl font-light leading-relaxed"
            >
              Experience premium fitness training with our expert-led programs designed for high performance and lasting results in an obsidian-class environment.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 sm:py-10 md:py-24 relative">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 md:mb-32 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h2 className="text-3xl md:text-7xl lg:text-[10rem] font-headline text-white/5 absolute -top-8 md:-top-16 lg:-top-24 left-0 leading-none select-none uppercase">Standards</h2>
            <h3 className="text-2xl md:text-4xl lg:text-6xl font-headline text-white uppercase relative z-10 leading-none">
              Tailored Training<br/><span className="text-primary">For Every Goal</span>
            </h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            <button className="w-12 h-12 flex items-center justify-center rounded-none border border-white/10 hover:border-primary transition-colors bg-surface">
              <span className="material-symbols-outlined text-sm">filter_list</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-none border border-white/10 hover:border-primary transition-colors bg-surface">
              <span className="material-symbols-outlined text-sm">search</span>
            </button>
          </motion.div>
        </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {[
            {
              num: '01',
              title: 'Gym Membership',
              desc: 'Full access to our state-of-the-art facility featuring premium equipment, recovery zone, and elite amenities.',
              price: 'FROM ₹999/MO',
              icon: 'fitness_center',
              img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
              mt: 'lg:-mt-12'
            },
            {
              num: '02',
              title: 'Zumba Classes',
              desc: 'Burn calories while having fun! High-energy dance workouts led by certified elite instructors in a party atmosphere.',
              price: '₹2,500 / 10 SESSIONS',
              icon: 'queue_music',
              img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
              mt: 'lg:mt-12'
            },
            {
              num: '03',
              title: 'Weight Loss',
              desc: 'Scientific approach to fat loss combining metabolic conditioning and personalized nutrition guidance.',
              price: 'CUSTOM PLANS',
              icon: 'monitoring',
              img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
              mt: 'lg:-mt-12'
            },
            {
              num: '04',
              title: 'Personal Training',
              desc: 'One-on-one sessions with our elite trainers. Focused entirely on your unique goals and physiology.',
              price: '₹999 / TRIAL SESSION',
              icon: 'person_pin',
              img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
              mt: 'lg:mt-0'
            },
            {
              num: '05',
              title: 'Strength Training',
              desc: 'Build lean muscle and functional power. Includes powerlifting, hypertrophy, and Olympic lifting fundamentals.',
              price: '₹500 / GROUP CLASS',
              icon: 'weight',
              img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
              mt: 'lg:mt-24'
            }
          ].map((program, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.2 }}
              className={`shrink-0 w-[85vw] sm:w-[65vw] md:w-auto snap-center ${program.mt}`}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.02}
                tiltEnable={typeof window !== 'undefined' ? window.innerWidth >= 1024 : false}
                className="group relative transition-transform duration-500 h-full w-full"
              >
                <div className="absolute -top-8 md:-top-10 left-0 text-6xl md:text-8xl font-headline text-white/5 group-hover:text-primary/10 transition-colors uppercase select-none">{program.num}</div>
                <div className="bg-surface relative overflow-hidden magazine-shadow border-b-4 border-transparent group-hover:border-primary transition-all duration-500 h-full flex flex-col">
                  <div className="h-44 sm:h-56 lg:h-64 overflow-hidden relative shrink-0">
                    <ImageWithSkeleton alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src={program.img} />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-primary text-white w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center red-glow-strong">
                      <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ transform: "translateZ(30px)" }}>{program.icon}</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col" style={{ transform: "translateZ(50px)" }}>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-headline text-white mb-2 sm:mb-4 tracking-wider uppercase">{program.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-8 flex-grow">
                      {program.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 sm:pt-6 mt-auto">
                      <span className="text-[var(--accent-secondary,#FF2E44)] font-headline text-lg sm:text-2xl tracking-wider">{program.price}</span>
                      <button 
                        onClick={() => selectProgramAndScroll(program.title)} 
                        className="bg-[var(--accent-primary,#D70015)] hover:bg-white text-white hover:text-black transition-all px-5 sm:px-8 py-2 sm:py-3 text-xs font-bold uppercase tracking-widest-plus inline-block shadow-md"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}

          {/* Corporate Wellness Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="group relative lg:mt-0 transition-transform duration-500 hover:-translate-y-2 shrink-0 w-[85vw] sm:w-[65vw] md:w-auto snap-center"
          >
            <div className="bg-surface relative overflow-hidden magazine-shadow border-2 border-dashed border-white/10 group-hover:border-primary/50 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] transition-all duration-500">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 sm:mb-8 group-hover:bg-primary transition-all duration-500 red-glow">
                <span className="material-symbols-outlined text-2xl sm:text-4xl text-primary group-hover:text-white">corporate_fare</span>
              </div>
              <h4 className="text-xl sm:text-3xl font-headline text-white mb-2 sm:mb-4 tracking-wider uppercase">Corporate Wellness</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-10 max-w-xs">
                Tailored performance programs designed for high-impact teams and executive health.
              </p>
              <button 
                onClick={() => selectProgramAndScroll('Corporate Wellness Inquiries')} 
                className="border border-[var(--accent-primary,#D70015)] hover:bg-[var(--accent-primary,#D70015)] hover:text-white transition-all px-6 sm:px-10 py-3 sm:py-4 text-xs font-bold uppercase tracking-widest-plus text-white"
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 sm:py-10 md:py-24 relative" id="schedule">
        <ClassSchedule />
      </section>

      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 sm:py-10 md:py-32 relative" id="pricing">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-4 block"
          >
            Membership
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-[6rem] font-headline text-white uppercase leading-none"
          >
            Elite <span className="text-primary">Pricing</span>
          </motion.h2>
        </div>
        <Pricing />
      </section>

      <section className="relative py-8 sm:py-16 md:py-32 px-4 md:px-6 bg-primary overflow-hidden w-full">
        <div className="absolute inset-0 bg-black/15 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="text-[25vw] font-headline text-white tracking-tighter leading-none select-none">NO EXCUSES</span>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <h3 className="text-3xl md:text-5xl lg:text-8xl font-headline text-white uppercase tracking-tight mb-6 md:mb-8 leading-none">Ready to claim your spot?</h3>
          <p className="text-white/90 font-medium max-w-2xl text-lg lg:text-xl mb-12">
            Join 500+ members who have already transformed their lives at Elite Fitness. Your first session is on us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 w-full sm:w-auto">
            <button 
              onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')} 
              className="bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all px-6 sm:px-14 py-4 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-widest-plus shadow-[0_0_30px_rgba(215,0,21,0.4)] w-full sm:w-auto"
            >
              Get Started Free
            </button>
            <a 
              href="#pricing" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all px-6 sm:px-14 py-4 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-widest-plus flex items-center justify-center w-full sm:w-auto"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
