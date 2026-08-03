import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export default function Reviews() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const reviews = [
    {
      num: '01',
      name: 'Sarah Johnson',
      role: 'Elite Member / 2yr',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
      stars: 5,
      text: '"The energy here is infectious! I\'ve lost 15lbs and gained a whole community of friends. The Zumba instructors are world-class."',
      mt: ''
    },
    {
      num: '02',
      name: 'Michael Chen',
      role: 'Elite Member / 6mo',
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
      stars: 5,
      text: '"I was nervous as a beginner, but everyone was so welcoming. The variety of classes keeps things exciting and challenging."',
      mt: 'lg:mt-8'
    },
    {
      num: '03',
      name: 'Elena Rodriguez',
      role: 'Elite Member / 1yr',
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
      stars: 5,
      text: '"Best decision for my mental health. The atmosphere is purely positive. 10/10 recommend to anyone looking to start their fitness journey!"',
      mt: ''
    },
    {
      num: '04',
      name: 'David Kim',
      role: 'Elite Member / 3mo',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      stars: 4,
      text: '"Facility is top notch and very clean. Only wish there were more evening slots for weekend classes, but overall fantastic."',
      mt: 'lg:-mt-8'
    },
    {
      num: '05',
      name: 'Jessica Wu',
      role: 'Elite Member / 3yr',
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
      stars: 5,
      text: '"Elite Zumba has become my morning ritual. It\'s the only workout that doesn\'t feel like work. Best studio in the city!"',
      mt: ''
    },
    {
      num: '06',
      name: 'Robert Wilson',
      role: 'Elite Member / 1.5yr',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
      stars: 5,
      text: '"Great HIIT sessions. The coaches know how to push you safely. I\'ve never felt stronger. Highly recommend the morning sessions."',
      mt: 'lg:-mt-8'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Member Reviews & Testimonials | Elite Fitness Studio — Bhagalpur</title>
        <meta name="description" content="Read real reviews from 500+ members at Elite Zumba & Fitness Studio, Bhagalpur. 4.9★ rating on Google. Discover why we're Bihar's highest-rated fitness community." />
      </Helmet>
      <section ref={heroRef} className="relative min-h-[50vh] md:min-h-[70vh] flex items-center overflow-hidden bg-background-dark">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* PLACEHOLDER — replace with real photo: group of Elite members post-workout, smiling, gym floor background */}
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Fitness Community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-background-dark/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/40"></div>
        </motion.div>
        <div className="relative z-10 px-4 md:px-6 lg:px-24 pt-28 md:pt-32 pb-12 md:pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8 relative z-10">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-6 flex items-center gap-4"
              >
                <span className="w-12 h-[2px] bg-primary"></span>
                Member Voices
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-headline text-4xl md:text-8xl lg:text-[10rem] leading-[0.85] text-white tracking-tighter uppercase mb-2"
              >
                Our Community
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-headline text-3xl md:text-7xl lg:text-[8rem] leading-[0.85] text-primary italic tracking-tighter uppercase"
              >
                Speaks Louder
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed"
            >
              Discover why 500+ members have chosen The Elite Zumba as their sanctuary of transformation. Your journey to peak performance starts with shared inspiration.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <button className="bg-primary hover:bg-white hover:text-primary transition-all px-12 py-5 text-sm font-bold uppercase tracking-widest-plus">
                Write a Review
              </button>
              <button className="border border-white/20 hover:border-primary hover:bg-primary transition-all px-10 py-4 text-xs font-bold uppercase tracking-widest-plus">
                View Gallery
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-surface p-8 md:p-12 rounded-none border border-white/10 glow-red min-w-[300px] md:min-w-[360px] flex flex-col items-center">
              <div className="absolute -top-8 md:-top-12 -right-8 md:-right-12 text-7xl md:text-9xl font-headline text-white/5 select-none leading-none">4.9</div>
              <div className="text-[80px] md:text-[120px] font-headline text-white leading-none mb-2 relative">
                4.9<span className="text-primary">/</span>5
              </div>
              <div className="flex gap-2 mb-8">
                {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-primary text-2xl fill-1">star</span>)}
                <span className="material-symbols-outlined text-primary text-2xl fill-1">star_half</span>
              </div>
              <div className="w-full space-y-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/50">
                    <span>Excellent</span>
                    <span>92%</span>
                  </div>
                  <div className="h-1 bg-white/5 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/50">
                    <span>Very Good</span>
                    <span>6%</span>
                  </div>
                  <div className="h-1 bg-white/5 overflow-hidden">
                    <div className="h-full bg-primary/50" style={{ width: '6%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/5 w-full text-center">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/80">500+ Verified Reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-24 py-6 sm:py-10 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-headline text-white uppercase mb-4">Recent<br/><span className="text-primary">Testimonials</span></h3>
            <div className="w-16 md:w-20 h-1 bg-primary"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 w-full md:w-auto"
          >
            <button className="h-12 w-12 flex items-center justify-center border border-white/10 bg-surface hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
            <select className="bg-surface border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest px-4 md:px-6 py-3 focus:border-primary focus:ring-0 appearance-none flex-1 md:min-w-[180px]">
              <option>Newest First</option>
              <option>Highest Rated</option>
              <option>Oldest First</option>
            </select>
          </motion.div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.2 }}
              className={`group relative pt-6 md:pt-8 shrink-0 w-[85vw] sm:w-[65vw] md:w-auto snap-center ${review.mt}`}
            >
              <div className="absolute -top-2 md:-top-4 left-4 md:left-6 text-5xl md:text-6xl font-headline text-white/5 group-hover:text-primary/10 transition-colors z-0">{review.num}</div>
              <div className="bg-surface p-6 md:p-10 h-full border-b-2 border-transparent hover:border-primary transition-all glow-red-hover flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-14 w-14 rounded-none overflow-hidden border border-white/10 p-1">
                    <ImageWithSkeleton className="w-full h-full object-cover transition-all duration-500" alt={`Portrait of ${review.name}`} src={review.img} />
                  </div>
                  <div>
                    <h4 className="font-headline text-xl text-white tracking-wider uppercase">{review.name}</h4>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
                <div className="flex text-primary mb-6 gap-1">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={`material-symbols-outlined text-sm ${star <= review.stars ? 'fill-1' : 'fill-0'}`}>star</span>
                  ))}
                </div>
                <p className="text-slate-400 italic leading-relaxed mb-8 flex-1 text-sm">
                  {review.text}
                </p>
                <div className="text-[9px] uppercase font-black text-white/20 tracking-[0.4em] group-hover:text-primary/40 transition-colors">Verified Elite</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-20 flex justify-center"
        >
          <button className="group flex items-center gap-4 text-white hover:text-primary transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest-plus">Load More Reviews</span>
            <span className="w-8 h-[1px] bg-white group-hover:bg-primary transition-all group-hover:w-12"></span>
          </button>
        </motion.div>
      </div>
    </>
  );
}
