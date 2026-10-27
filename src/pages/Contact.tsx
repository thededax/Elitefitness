import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useId, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameId = useId();
  const phoneId = useId();
  const messageId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitted(true);
    const encoded = encodeURIComponent(
      `Hello Elite Fitness Team, I have an inquiry:\n\nName: ${fullName}\nPhone: ${phone}\nMessage: ${message || 'General enquiry'}`
    );
    window.open(`https://wa.me/919065516492?text=${encoded}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us & Location | Elite Zumba & Fitness Studio — Bhagalpur</title>
        <meta
          name="description"
          content="Contact Elite Zumba & Fitness Studio in Bhagalpur. Located at 5th Floor, Savitri Tower, Kotwali Chowk. Call +91 90655 16492 or WhatsApp us for a free trial session."
        />
      </Helmet>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[45vh] md:min-h-[55vh] flex items-center overflow-hidden bg-[var(--bg-canvas,#070705)]">
        <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Fitness Community" 
            className="w-full h-full object-cover gym-photo-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-canvas,#070705)]/85 via-[var(--bg-canvas,#070705)]/90 to-[var(--bg-canvas,#070705)]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas,#070705)] via-transparent to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[var(--bg-surface,#121212)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-4"
          >
            <span>DIRECT CONNECT</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl leading-none tracking-tight text-[var(--text-primary,#FFFFFF)] uppercase mb-4"
          >
            CONNECT WITH <span className="text-[var(--accent-primary,#D70015)]">ELITE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto text-[var(--text-secondary,#A0A0A0)] text-sm sm:text-base font-normal leading-relaxed"
          >
            Visit our 5,000 sq.ft sanctuary at Savitri Tower, Bhagalpur or message our desk team on WhatsApp for instant trial booking.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative py-12 md:py-24 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-6 sm:p-8 md:p-10 magazine-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  SEND AN <span className="text-[var(--accent-primary,#D70015)]">INQUIRY</span>
                </h3>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Direct Response</span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-primary,#D70015)] text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">
                    ✓
                  </div>
                  <h4 className="text-xl font-display font-bold uppercase text-white">Message Synced</h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
                    Thanks, <strong>{fullName}</strong>. Your WhatsApp conversation is open. Our concierge will assist you immediately.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor={nameId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        id={nameId}
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none placeholder:text-[var(--text-muted)]" 
                        placeholder="e.g. Rahul Sharma" 
                        type="text" 
                      />
                    </div>
                    <div>
                      <label htmlFor={phoneId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input 
                        id={phoneId}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none placeholder:text-[var(--text-muted)]" 
                        placeholder="+91 00000 00000" 
                        type="tel" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={messageId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Your Message or Goal
                    </label>
                    <textarea 
                      id={messageId}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none placeholder:text-[var(--text-muted)]" 
                      placeholder="Tell us what you want to achieve or when you plan to visit..." 
                      rows={4}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Send & Connect on WhatsApp</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Details & Location */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-6 sm:p-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent-secondary,#FF2E44)] mb-3 block">
                Direct Connection
              </span>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">+91 90655 16492</p>
              <p className="text-xs font-mono text-[var(--text-secondary)] mb-6">Open Mon – Sat: 6:00 AM – 10:00 PM</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white py-3 px-4 rounded-xl transition-all text-xs font-mono font-bold uppercase tracking-wider" 
                  href="https://wa.me/919065516492"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                  <span>WhatsApp</span>
                </a>
                <a 
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-surface-elevated,#181818)] border border-white/20 hover:border-[var(--accent-primary,#D70015)] hover:text-[var(--accent-secondary,#FF2E44)] text-white py-3 px-4 rounded-xl transition-all text-xs font-mono font-bold uppercase tracking-wider" 
                  href="tel:+919065516492"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Call Gym</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-2xl">location_on</span>
                <h4 className="font-display font-bold text-xl uppercase text-white">THE SANCTUARY</h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                5th Floor, Savitri Tower, Above Vishal Mega Mart, Kotwali Chowk, Bhagalpur, Bihar 812001
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] overflow-hidden h-52 relative">
              <iframe 
                title="Location Map"
                allowFullScreen 
                className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300" 
                loading="lazy" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5866750345674!2d86.9719369150119!3d25.24151798387431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f04bc225c5d33f%3A0xc66513233346d03d!2sElite%20Fitness!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin" 
                style={{ border: 0 }}
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
