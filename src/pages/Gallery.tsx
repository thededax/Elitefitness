import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export default function Gallery() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const images = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHEyKpeLTfaTDABtlQf2xb0MpNk5wATgNYNPoWfvoBlUN8HgBNIIXAC5AsNHqx2jjQODncDTFD8KerWgqxP5wI8IFxV0ppG39Uyb9dcejax4etzM-hWldLOLxV6oiG3g6fpIlwM_ryi6Pp5mUhUZUndT1wq_r-2wR8QEWHfAiDwWxC1reurgVLQiOV0_YP6SqYcBNdkLlfohfUbAfDZQgoq1snRsR4fMPuDSb6qfxqemx7DdRvweCG7syy1Kc152gWSHpoktk8xhMS',
      category: 'Zumba Energy',
      title: 'Rhythmic Cardio',
      isLarge: false,
      glow: true
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0Ml2cVbBVMMg7UtzRN50fpJdvI-AnmaY8ot0LXHUqEmzZr7_459ielm2WDp-4udu_i6LDK0sfhlyk7uJ6lvwWuz6f0-WWJpipHcaxiq64GfbunqAn7d7yx6AgSsp3pbblZgDe7YF0jIavNyQre6e4yGcfiDq3bfHImZWFJyMZlt9EQzGQDFsv232w8eWnD3xlC1A-d2dUKfx2SL-h4U_TnPSddx1g1iDDUwiOCVjDSbzNueDDtDDVyC2uxyaWcdgUz-Anb3Ueo7zC',
      category: 'Strength Zone',
      title: 'The Weight Floor',
      isLarge: false,
      glow: false
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV1m5FBccZ7k-_zVUhTrYlun0wMPgQikMxyIzVV0P9e6HK2-4HZM2O3Ml3D7Bu78jETep6xNH5mfWo_ExJDmfaa3RFPtTqg9KufaIWGFowQZXI2nwAKUsxx0W_siNgL827vLUZ5oJjFw5rZY_faiP0E5oC62eWpZ1E34j2hCo5kNjUk_oH-YrjESF6P9UnfYzMaPhK1dOIpVB2sCI2eHXv-vRiWsQdVQ-Vwb5JfgWDUwA3Yq3e_C8w2dsP9e7ZRT8gejLn77NBLkCw',
      category: 'Studio Interior',
      title: 'The Main Arena',
      desc: 'Equipped with state-of-the-art sound and immersive neon lighting.',
      isLarge: true,
      glow: true
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQGx1WI9Nq8ANWFt01LxWptWSa_1MdBSmnDsghWKyQGpJOyQATmfWn-Juvo8xZ-HmpXXCd49lvwNsGjS2yiQxVCXfE_sNb1DimHgJwnUp3VyMO2_dLUTc-2OisatL_bH36Gze92bE4XzGLyEQYVKi8VllAqUJK-FWcTLjlZ8qs5nSuxd9OFr61xo7Qxf7K_ze6OZjN2cuwG9Zg7XOxJa_aLNo2spKC3IPizz5_VVP3-V9s2v5UsxOK9ckyiYulIpH5XM8vDMGII0nI',
      category: 'Performance',
      title: 'Elite Coaching',
      isLarge: false,
      glow: false
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__mXCj0mdZjQ-OHcaGNjmCahipO3awgVFTz2Q2bQDyU85UU6srSdGdSzvE_A3pirxfAt4PKVQNnuTSVerxHLWXkQuPzPrna53FTyRtxNlOf-jER7U2sGKH_iJcVvjwaV_08_iS7wZEyq4R0LCEYmelSeNsUdUGUsviP9Kyb46troiXmMLjQqi3S-iMoRdaToctBIMezu1ma5CPZjr9o3wWlW2hAYWMoXs5ljB8k6Nl9d4m5IVzZfLnCDdREF44-2mxV-jYxBLXXmK',
      category: 'Cardio Lab',
      title: 'The Rush Zone',
      isLarge: false,
      glow: false
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYLRwoUvR-khWTHm8kWDrrC4r9KQ1pIRFnSW-jqSnX2ZGJB1Ez9X3xijg9yAq6rqKp2vB9Ue8uUA3RhvDXEGcs2-z7OYFfnkMr_MnzML1YARPoNebb9Qg-d1vLtEgrA8dbNkauenbmtwu-T6vx3NOAgyeb1t3n7HfKq0xnzrLTnZRR2Y_CuipW8Re05BFvwEM2HG3C4rSZREiYSXnp8PqbVcDwh_O8v38bgzSdEQM_6zy9VQZo37kAHVC-geeb4jLhkJ4UlAiunBxk',
      category: 'Our Tribe',
      title: 'Post-Workout Glow',
      isLarge: false,
      glow: true
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQmCkjgFIy1w6X6IzgQthNxTQW2I01OufOj2WALpNHfHA3AbXB80G6Fn0H4T7zggoUiEfp6kXhzco21rh-zcWxkVxvWCqMF-KqAfEaEfgen9hbN11HPXKSzOeihv3AakuYiUTyvqglfy_AIDyM0ay_aKTmIKmWFDzgsstiIckrvmfhy0aUeAvrmi5T8vJVFUCFHtKEUb7vOhHag_wrd3O7szF4czJlBRtjGQ3Z0YJoS0qOceFcoxOW_mKgtoU8FJPyZeVhmy7icuA5',
      category: 'Weights',
      title: '',
      isLarge: false,
      glow: false
    }
  ];

  return (
    <div className="bg-grid">
      <Helmet>
        <title>Studio Gallery | Elite Zumba & Fitness Studio — Bhagalpur</title>
        <meta name="description" content="Explore photos of Elite Zumba & Fitness Studio in Bhagalpur. High-energy Zumba sessions, state-of-the-art strength training floor, and community moments." />
      </Helmet>
      <section ref={heroRef} className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden bg-background-dark">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* PLACEHOLDER — replace with real photo: Elite gym Zumba class in action, neon lighting, high energy */}
          <img 
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Zumba Energy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-background-dark/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/40"></div>
        </motion.div>
        <div className="relative z-10 px-4 md:px-6 lg:px-24 pt-28 md:pt-32 pb-12 md:pb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-4 flex items-center gap-4"
          >
            <span className="w-12 h-[2px] bg-primary"></span>
            Visual Standards
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-7xl lg:text-[9rem] font-headline leading-[0.85] tracking-tighter uppercase mb-6 md:mb-8"
          >
            STUDIO <span className="text-primary italic">MOMENTS</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mt-4 md:mt-6"
          >
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Step inside Bhagalpur's most energetic fitness destination. A high-contrast visual journey through transformation, grit, and rhythmic energy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-6 lg:px-24 mb-10 md:mb-16 overflow-x-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 whitespace-nowrap min-w-max pb-4"
        >
          <button className="bg-primary text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest-plus transition-all">All Experience</button>
          <button className="bg-surface hover:bg-primary/20 text-white/60 hover:text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest-plus transition-all">Zumba Energy</button>
          <button className="bg-surface hover:bg-primary/20 text-white/60 hover:text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest-plus transition-all">Strength Zone</button>
          <button className="bg-surface hover:bg-primary/20 text-white/60 hover:text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest-plus transition-all">Cardio Lab</button>
          <button className="bg-surface hover:bg-primary/20 text-white/60 hover:text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest-plus transition-all">Interior</button>
        </motion.div>
      </section>

      <section ref={containerRef} className="relative md:h-[400vh] bg-background-dark py-4 md:py-0">
        <div className="md:sticky md:top-0 md:h-screen overflow-hidden flex items-center">
          <motion.div 
            style={{ x: window.innerWidth >= 768 ? x : 0 }} 
            className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 px-4 md:px-24 w-full md:w-max items-center h-[50vh] md:h-[60vh]"
          >
            {images.map((img, i) => (
              <motion.div 
                key={i}
                className={`group relative overflow-hidden bg-surface cursor-pointer shrink-0 h-full snap-center
                  ${img.isLarge ? 'w-[85vw] md:w-[60vw]' : 'w-[75vw] md:w-[35vw]'}
                  ${img.glow ? 'red-glow' : ''}
                `}
              >
                <ImageWithSkeleton alt={img.title || img.category} className="w-full h-full object-cover transition-all duration-700 block" src={img.src} />
                <div className={`absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                
                {img.title && (
                  <div className={`absolute bottom-0 left-0 p-4 md:p-10 w-full translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100`}>
                    <span className="text-primary font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2 block">{img.category}</span>
                    <h3 className={`${img.isLarge ? 'text-2xl md:text-5xl tracking-tighter uppercase mb-1 md:mb-2' : 'text-lg md:text-3xl tracking-wider'} font-headline text-white`}>{img.title}</h3>
                    {img.desc && <p className="text-slate-400 text-xs md:text-sm max-w-xs">{img.desc}</p>}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 text-center px-4"
        >
          <button className="group relative overflow-hidden bg-primary px-8 sm:px-16 py-4 sm:py-6 text-sm font-bold uppercase tracking-widest-plus transition-all hover:pr-20 w-full sm:w-auto">
            <span className="relative z-10">Load More Moments</span>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">expand_more</span>
          </button>
        </motion.div>
    </div>
  );
}
