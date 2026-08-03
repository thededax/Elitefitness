import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Helmet>
        <title>Contact Us & Location | Elite Zumba & Fitness Studio — Bhagalpur</title>
        <meta name="description" content="Contact Elite Zumba & Fitness Studio in Bhagalpur. Located at 5th Floor, Savitri Tower, Kotwali Chowk. Call +91 90655 16492 or WhatsApp us for a free trial session." />
      </Helmet>
      <section ref={heroRef} className="relative min-h-[45vh] md:min-h-[60vh] flex items-center overflow-hidden bg-background-dark">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          {/* PLACEHOLDER — replace with real photo: Elite gym reception/entrance area, welcoming atmosphere, front desk */}
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Fitness Community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/60 via-background-dark/80 to-background-dark/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/50"></div>
          <div className="absolute inset-0 bg-background-dark/50"></div>
        </motion.div>
        <div className="relative z-10 px-4 md:px-6 lg:px-24 pt-28 md:pt-32 pb-12 md:pb-16 flex flex-col items-center text-center w-full">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[2px] bg-primary"></span>
            Get In Touch
            <span className="w-12 h-[2px] bg-primary"></span>
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-headline text-5xl md:text-7xl lg:text-[10rem] leading-[0.85] tracking-tighter text-white uppercase mb-4"
          >
            CONTACT <span className="text-primary italic">US</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl text-slate-400 text-lg lg:text-xl font-light leading-relaxed"
          >
            Ready to defy your limits? Our team is standing by to help you start your elite transformation.
          </motion.p>
        </div>
      </section>

      <section className="relative py-6 sm:py-10 md:pb-32 px-4 md:px-6 lg:px-24">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="bg-surface p-6 md:p-8 lg:p-12 relative group">
              <div className="absolute -top-6 -left-6 w-full h-full border border-primary/20 -z-10 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform"></div>
              <h3 className="text-3xl md:text-4xl font-headline text-white mb-8 md:mb-10 tracking-wider">SEND A <span className="text-primary">MESSAGE</span></h3>
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 glow-border flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Full Name</label>
                    <input className="bg-background-dark border-b border-white/10 p-4 focus:ring-0 focus:outline-none text-white transition-all placeholder:text-white/10" placeholder="e.g. Rahul Sharma" type="text" />
                  </div>
                  <div className="space-y-2 glow-border flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Phone Number</label>
                    <input className="bg-background-dark border-b border-white/10 p-4 focus:ring-0 focus:outline-none text-white transition-all placeholder:text-white/10" placeholder="+91 00000 00000" type="tel" />
                  </div>
                </div>
                <div className="space-y-2 glow-border flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Message</label>
                  <textarea className="bg-background-dark border-b border-white/10 p-4 focus:ring-0 focus:outline-none text-white transition-all placeholder:text-white/10" placeholder="How can we help you reach your goals?" rows={4}></textarea>
                </div>
                <button className="group relative overflow-hidden bg-primary w-full py-6 text-sm font-bold uppercase tracking-widest-plus transition-all hover:bg-white hover:text-primary">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Deliver Message
                    <span className="material-symbols-outlined text-lg">send</span>
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-5 flex flex-col gap-6 md:gap-8"
          >
            <div className="bg-surface p-6 md:p-10 border-l-4 border-primary">
              <span className="text-xs font-bold uppercase tracking-widest-plus text-slate-500 mb-4 block">Direct Connection</span>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-3xl md:text-4xl font-headline text-white mb-1">+91 90655 16492</p>
                  <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest">Available 6AM - 10PM</p>
                </div>
                <a className="flex items-center justify-center gap-4 bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white py-4 transition-all text-xs font-bold uppercase tracking-widest-plus" href="https://wa.me/919065516492">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            <div className="bg-surface p-6 md:p-10 group cursor-default">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h4 className="font-headline text-2xl md:text-3xl text-white tracking-widest uppercase">The Venue</h4>
              </div>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-light">
                Savitri Tower, Above Vishal Mega Mart,<br/>
                Bhagalpur, Bihar
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 border border-white/10 flex items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-sm">public</span>
                </a>
                <a className="w-10 h-10 border border-white/10 flex items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-sm">alternate_email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full h-[300px] md:h-[500px] relative border-t border-white/5">
        <iframe allowFullScreen className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700" loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.587823521035!2d86.9741!3d25.2445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzQwLjIiTiA4NsKwNTgnMjYuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" style={{border:0}}></iframe>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <button className="bg-primary px-10 py-4 text-xs font-bold uppercase tracking-widest-plus flex items-center gap-3 shadow-2xl">
            <span className="material-symbols-outlined">directions</span>
            Get Directions
          </button>
        </div>
      </section>
    </>
  );
}
