import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Helmet>
        <title>Our Story | Elite Zumba & Fitness Studio — Bhagalpur</title>
        <meta name="description" content="Learn about Elite Fitness Studio's journey since 2018. From a community gathering to Bhagalpur's premier fitness destination with 500+ members and 12+ expert trainers." />
      </Helmet>
      <section ref={heroRef} className="relative min-h-[45vh] md:h-[80vh] flex items-center overflow-hidden bg-background-dark">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* PLACEHOLDER — replace with real photo: gym interior wide shot showing full floor, mirrors, and equipment, morning light */}
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Studio Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-background-dark/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/30"></div>
        </motion.div>
        <div className="relative z-20 px-6 lg:px-24 w-full pt-24 md:pt-0">
          <div className="flex flex-col gap-0 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-[2px] bg-primary"></span>
              Since 2018
            </motion.span>
            <h1>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block text-[15vw] md:text-[12vw] lg:text-[10rem] font-headline leading-[0.85] tracking-tighter text-white"
              >
                OUR
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block text-[15vw] md:text-[12vw] lg:text-[10rem] font-headline leading-[0.85] tracking-tighter text-white"
              >
                <span className="text-primary italic">STORY</span>
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 md:mt-10 text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed font-light"
            >
              From a humble community park gathering to Bhagalpur's premier high-energy fitness sanctuary. We didn't just build a gym; we built a movement.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 relative bg-background-dark overflow-hidden bg-grid">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-6 md:gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <span className="absolute -top-10 md:-top-16 -left-6 md:-left-12 text-[8rem] md:text-[15rem] font-headline text-white/5 select-none pointer-events-none uppercase">SPIRIT</span>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-headline text-white leading-none mb-6 md:mb-8 uppercase">The Bhagalpur<br/><span className="text-primary">Spirit</span></h2>
              <div className="w-16 md:w-24 h-1 bg-primary mb-8 md:mb-10"></div>
              <div className="space-y-4 md:space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-light">
                <p>
                  Elite Zumba & Fitness Studio was born from a singular passion: to redefine what fitness looks like in Bhagalpur. We noticed that traditional gyms felt like chores, so we fused the infectious energy of Zumba with the raw grit of functional training.
                </p>
                <p>
                  Since 2018, we have helped hundreds of members shed their inhibitions and transform their lives. Our story isn't about the equipment we have—it's about the rhythm of the people who walk through our doors every morning at 5:00 AM.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative mt-8 lg:mt-0 w-full"
          >
            <div className="relative magazine-shadow">
              <div className="grid grid-cols-2 gap-4">
                {/* PLACEHOLDER — replace with real photo: high-energy Zumba class session led by instructor */}
                <ImageWithSkeleton alt="Zumba class" className="w-full transition-all duration-700 aspect-[4/5] object-cover" src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop" />
                {/* PLACEHOLDER — replace with real photo: close-up of premium dumbbells and weight plates on gym floor */}
                <ImageWithSkeleton alt="Weights" className="w-full transition-all duration-700 aspect-[4/5] object-cover mt-12" src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" />
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border border-primary/20 -z-10 translate-x-4 translate-y-4"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 bg-[#050505] relative px-4 md:px-6 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-24 relative"
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-headline text-white/5 absolute -top-8 md:-top-12 left-0 leading-none select-none uppercase">PURPOSE</h2>
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-headline text-white uppercase relative z-10">Mission & <span className="text-primary">Vision</span></h3>
            <p className="text-slate-400 text-xs md:text-sm mt-4 border-l border-primary/30 pl-4 md:pl-6 max-w-xl">Driving the future of fitness in Bihar through innovation, energy, and unwavering support.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6 }}
              className="group relative pt-6 md:pt-12"
            >
              <div className="absolute -top-2 md:-top-4 left-0 text-5xl md:text-7xl font-headline text-white/5 group-hover:text-primary/10 transition-colors">01</div>
              <div className="bg-surface p-6 md:p-10 h-full border-b-2 border-transparent hover:border-primary transition-all magazine-shadow">
                <span className="material-symbols-outlined text-primary text-4xl md:text-6xl mb-6 md:mb-8 block group-hover:scale-110 transition-transform">rocket_launch</span>
                <h4 className="text-2xl md:text-3xl font-headline text-white mb-4 md:mb-6 tracking-wider uppercase">Our Mission</h4>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">
                  To empower the individuals of Bhagalpur to lead healthier, more vibrant lives by providing an inclusive environment where fitness feels like a celebration, not a punishment.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative pt-6 md:pt-24 lg:pt-32"
            >
              <div className="absolute top-2 md:top-8 lg:top-16 left-0 text-5xl md:text-7xl font-headline text-white/5 group-hover:text-primary/10 transition-colors">02</div>
              <div className="bg-surface p-6 md:p-10 h-full border-b-2 border-transparent hover:border-primary transition-all magazine-shadow">
                <span className="material-symbols-outlined text-primary text-4xl md:text-6xl mb-6 md:mb-8 block group-hover:scale-110 transition-transform">visibility</span>
                <h4 className="text-2xl md:text-3xl font-headline text-white mb-4 md:mb-6 tracking-wider uppercase">Our Vision</h4>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">
                  To become the benchmark for elite fitness in North India, fostering a culture where every member has access to international-standard training methods and a supportive community.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-24 relative bg-surface overflow-hidden">
        <BeforeAfterSlider 
          beforeImage="/images/transformations/transformation-day-1.jpg"
          afterImage="/images/transformations/transformation-month-6.jpg"
          title="Elite Transformations"
          beforeLabel="Day 1"
          afterLabel="After 6 Months"
        />
      </section>

      <section className="py-6 sm:py-10 md:py-24 lg:py-32 relative bg-background-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative order-2 lg:order-1 w-full"
          >
            <div className="relative magazine-shadow">
              <ImageWithSkeleton alt="Trainer Philosophy" className="w-full transition-all duration-700 aspect-[4/5] object-cover" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" />
              <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 bg-primary p-6 md:p-12 hidden sm:block">
                <span className="text-white font-headline text-2xl md:text-4xl italic leading-none block">PUSH YOUR</span>
                <span className="text-white font-headline text-4xl md:text-6xl italic leading-none block">LIMIT</span>
              </div>
              <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 w-full h-full border border-primary/30 -z-10 translate-x-4 translate-y-4"></div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 order-1 lg:order-2 w-full"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Our Approach</span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-headline text-white leading-[0.9] mb-8 md:mb-12 uppercase">Trainer<br/><span className="text-primary">Philosophy</span></h2>
            <div className="space-y-8 md:space-y-10">
              <div className="flex gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl md:text-3xl text-primary group-hover:text-white">psychology</span>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-headline text-white mb-2 uppercase tracking-wide">Mindset First</h4>
                  <p className="text-slate-400 font-light text-sm md:text-base">Our trainers believe that physical strength is a byproduct of mental resilience. We coach the person, not just the muscle.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl md:text-3xl text-primary group-hover:text-white">diversity_3</span>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-headline text-white mb-2 uppercase tracking-wide">Personalized Mentorship</h4>
                  <p className="text-slate-400 font-light text-sm md:text-base">In Bhagalpur, we know every face. Our philosophy centers on individual attention, ensuring no one feels lost.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl md:text-3xl text-primary group-hover:text-white">auto_graph</span>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-headline text-white mb-2 uppercase tracking-wide">Science-Backed Results</h4>
                  <p className="text-slate-400 font-light text-sm md:text-base">We balance the fun of Zumba with evidence-based strength and conditioning to guarantee sustainable progress.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-6 sm:py-10 md:py-24 lg:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
          <h2 className="text-4xl md:text-8xl lg:text-[12rem] font-headline text-white tracking-tighter leading-none mb-6 md:mb-12 select-none opacity-20 absolute -top-4 md:-top-16 left-0 right-0 text-center uppercase pointer-events-none">BHAGALPUR</h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-20 pt-6 md:pt-12"
          >
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-headline text-white uppercase tracking-wide mb-6 md:mb-8">COMMUNITY FITNESS CULTURE</h3>
            <p className="text-white text-base md:text-xl lg:text-2xl font-light italic max-w-4xl mx-auto leading-relaxed">
              "At Elite Zumba, you don't just join a gym; you join a family. We celebrate birthdays, we track milestones together, and we motivate each other when the going gets tough."
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center border-t border-white/20 pt-8 md:pt-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }} transition={{ duration: 0.6 }}>
              <div className="text-3xl md:text-6xl lg:text-8xl font-headline text-white leading-none">500+</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/70 mt-2 md:mt-4">Active Members</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="text-3xl md:text-6xl lg:text-8xl font-headline text-white leading-none">12+</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/70 mt-2 md:mt-4">Expert Trainers</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="text-3xl md:text-6xl lg:text-8xl font-headline text-white leading-none">25+</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/70 mt-2 md:mt-4">Daily Classes</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="text-3xl md:text-6xl lg:text-8xl font-headline text-white leading-none">6+yrs</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/70 mt-2 md:mt-4">Legacy</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-24 px-4 md:px-6 lg:px-24 bg-background-dark">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto bg-surface border border-white/5 p-6 md:p-12 lg:p-20 magazine-shadow flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 text-center md:text-left"
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline text-white uppercase leading-none mb-4 md:mb-6">Ready to start<br/>your journey?</h2>
            <p className="text-slate-400 text-base md:text-lg font-light">Visit us today in the heart of Bhagalpur and experience the energy firsthand.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto">
            <Link to="/contact" className="bg-primary hover:bg-white hover:text-primary transition-all px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-widest-plus text-center">
              Book Free Demo
            </Link>
            <Link to="/programs" className="border border-white/20 hover:border-primary hover:bg-primary transition-all px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-widest-plus text-center">
              View Schedule
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
