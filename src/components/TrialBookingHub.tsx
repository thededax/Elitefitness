import { useState, useEffect, useId, type FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function TrialBookingHub() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('Strength & Hypertrophy');
  const [timeSlot, setTimeSlot] = useState('Evening (5:00 PM - 9:30 PM)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const programId = useId();
  const timeSlotId = useId();

  // Listen to custom event from any CTA on the page
  useEffect(() => {
    const handleSelectProgram = (event: Event) => {
      const customEvent = event as CustomEvent<{ program: string; tier?: string }>;
      if (customEvent.detail?.program) {
        setProgram(customEvent.detail.program);
        setNotification(`Selected: "${customEvent.detail.program}"`);
        setTimeout(() => setNotification(null), 4000);
      }
    };

    window.addEventListener('elite:select-program', handleSelectProgram);

    // Also check URL parameters on initial mount
    const params = new URLSearchParams(window.location.search);
    const paramProgram = params.get('program');
    if (paramProgram) {
      setProgram(paramProgram);
    }

    return () => {
      window.removeEventListener('elite:select-program', handleSelectProgram);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Simulate submission and provide instant WhatsApp booking sync
    setIsSubmitted(true);

    const message = encodeURIComponent(
      `Hello Elite Fitness Team, I would like to claim my Free 3-Day Trial Pass!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nInterested In: ${program}\nPreferred Slot: ${timeSlot}`
    );
    // WhatsApp auto-handoff
    window.open(`https://wa.me/919065516492?text=${message}`, '_blank');
  };

  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)]" id="trial-booking">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span>06 / FAST PASS ACCESS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-none">
            CLAIM YOUR FREE <br />
            <span className="text-[var(--accent-primary,#D70015)]">3-DAY TRIAL PASS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)] mt-2 sm:mt-3">
            Experience our 5,000 sq.ft strength floor, high-energy Zumba sessions, and verified coaching before making any commitment.
          </p>
        </div>

        {/* Dynamic Context Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 sm:mb-8 max-w-md mx-auto p-3 sm:p-3.5 rounded-lg bg-[var(--accent-primary,#D70015)] text-white text-xs font-mono font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(215,0,21,0.5)]"
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{notification} — Form updated below</span>
          </motion.div>
        )}

        {/* 12-Column Split Conversion Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column (6 cols): High-Converting Lead Form */}
          <div className="lg:col-span-6 rounded-xl sm:rounded-2xl border border-[var(--border-accent,rgba(215,0,21,0.45))] bg-[var(--bg-surface,#121212)] p-4 sm:p-6 md:p-10 flex flex-col justify-between magazine-shadow">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                <h3 className="text-lg sm:text-2xl font-display font-bold uppercase text-[var(--text-primary)]">
                  Trial Reservation Form
                </h3>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-0.5 rounded bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-secondary,#FF2E44)] border border-[var(--accent-primary)]/40 font-bold">
                  Instant Pass Confirmation
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-primary,#D70015)] text-white flex items-center justify-center mx-auto text-3xl font-bold shadow-lg">
                    ✓
                  </div>
                  <h4 className="text-2xl font-display font-bold uppercase text-[var(--text-primary)]">
                    Trial Pass Generated!
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. We've synced your request with our front desk and WhatsApp concierge. Show this confirmation at the desk upon arrival.
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/919065516492"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                    >
                      <span>Open in WhatsApp</span>
                      <span className="material-symbols-outlined text-sm">chat</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id={nameId}
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id={phoneId}
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    />
                  </div>

                  {/* Program Selection Dropdown */}
                  <div>
                    <label htmlFor={programId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1.5">
                      Selected Program / Membership
                    </label>
                    <select
                      id={programId}
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    >
                      <option value="Strength & Hypertrophy">Strength & Hypertrophy (Barbell / Machines)</option>
                      <option value="Zumba Energy & Dance Fitness">Zumba Energy & Dance Fitness</option>
                      <option value="1-on-1 Elite Coaching">1-on-1 Dedicated Personal Coaching</option>
                      <option value="Metabolic HIIT & Conditioning">Metabolic HIIT & Fat Loss Circuits</option>
                      <option value="Yoga, Mobility & Decompression">Yoga, Mobility & Joint Recovery</option>
                      <option value="Elite Transformation (QUARTERLY)">Elite Transformation Membership</option>
                      <option value="Starter Track (MONTHLY)">Starter Track Membership</option>
                      <option value="VIP Private Coaching (ANNUAL)">VIP Private Coaching Membership</option>
                    </select>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label htmlFor={timeSlotId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1.5">
                      Preferred Workout Time Slot
                    </label>
                    <select
                      id={timeSlotId}
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    >
                      <option value="Morning (6:00 AM - 9:00 AM)">Morning (6:00 AM - 9:00 AM)</option>
                      <option value="Midday (10:00 AM - 4:00 PM)">Midday (10:00 AM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 9:30 PM)">Evening (5:00 PM - 9:30 PM)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(215,0,21,0.4)] flex items-center justify-center gap-2 font-mono"
                    >
                      <span>Claim Free 3-Day Trial Pass →</span>
                    </button>
                    <p className="text-[10px] font-mono text-center text-[var(--text-muted)] mt-2">
                      🔒 100% Privacy Protected. No spam. Instant WhatsApp pass delivery.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column (6 cols): Location, Operating Hours & Direct WhatsApp Hub */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Facility & Direct Contact Card */}
            <div className="rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-xl sm:text-2xl">location_on</span>
                <div>
                  <h4 className="text-lg sm:text-xl font-display font-bold uppercase text-[var(--text-primary)]">
                    SAVITRI TOWER FACILITY
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[var(--text-secondary)]">Bhagalpur's Premier Fitness Sanctuary</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 sm:mb-6 font-normal">
                5th Floor, Savitri Tower, Above Vishal Mega Mart, Kotwali Chowk, Bhagalpur, Bihar 812001.
              </p>

              {/* Operating Hours Table */}
              <div className="rounded-xl bg-[var(--bg-canvas,#080808)] p-3 sm:p-4 border border-white/5 mb-4 sm:mb-6">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-secondary,#FF2E44)] font-bold block mb-1.5 sm:mb-2">
                  Operating Hours:
                </span>
                <div className="flex justify-between items-center text-xs font-mono text-[var(--text-primary)] py-1 border-b border-white/5">
                  <span>Monday – Saturday</span>
                  <span className="text-[var(--accent-secondary,#FF2E44)] font-bold">06:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-[var(--text-primary)] py-1 pt-1.5 sm:pt-2">
                  <span>Sunday</span>
                  <span className="text-[var(--text-secondary)]">08:00 AM – 12:00 PM (Open Gym)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <a
                  href="https://wa.me/919065516492"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl bg-[#25D366] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-white hover:text-[#25D366] transition-all shadow-md min-h-[44px]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+919065516492"
                  className="flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl bg-[var(--bg-surface-elevated,#181818)] border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider hover:border-[var(--accent-primary,#D70015)] hover:text-[var(--accent-secondary,#FF2E44)] transition-all shadow-md min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Call +91 90655 16492</span>
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map */}
            <div className="rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] overflow-hidden h-[180px] sm:h-[220px] md:h-[260px] relative">
              <iframe
                title="Elite Fitness Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5866750345674!2d86.9719369150119!3d25.24151798387431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f04bc225c5d33f%3A0xc66513233346d03d!2sElite%20Fitness!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
