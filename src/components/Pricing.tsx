import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Standard',
    desc: 'Perfect for beginners looking to start their fitness journey.',
    monthly: 999,
    annual: 9990,
    features: [
      'Full Gym Access (Off-Peak)',
      '1 Group Class Per Week',
      'Basic Fitness Assessment',
      'Locker Room Access'
    ],
    highlighted: false,
    icon: 'fitness_center'
  },
  {
    name: 'Elite',
    desc: 'Our most popular plan. Unrestricted access and premium perks.',
    monthly: 1999,
    annual: 19990,
    features: [
      '24/7 Unlimited Gym Access',
      'Unlimited Group Classes',
      'Monthly Personal Training Session',
      'Premium Recovery Area Access',
      'Complimentary Guest Pass (1/mo)'
    ],
    highlighted: true,
    icon: 'bolt'
  },
  {
    name: 'Transform',
    desc: 'The ultimate package. Dedicated coaching and maximum results.',
    monthly: 3999,
    annual: 39990,
    features: [
      'Everything in Elite Tier',
      'Weekly 1-on-1 Personal Training',
      'Customized Nutrition Plan',
      'Advanced Body Composition Analysis',
      'Priority Class Booking'
    ],
    highlighted: false,
    icon: 'workspace_premium'
  }
];

export default function Pricing({ isAnnual = false }: { isAnnual?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
      {pricingPlans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`relative p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 flex flex-col h-full
            ${plan.highlighted 
              ? 'bg-primary text-white magazine-shadow z-10 scale-100 md:scale-105 glow-red' 
              : 'bg-surface border border-white/5 text-slate-300'
            }
          `}
        >
          {plan.highlighted && (
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-primary text-[10px] font-bold uppercase tracking-widest-plus px-4 py-1">
              Most Popular
            </div>
          )}
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 flex items-center justify-center rounded-none border ${plan.highlighted ? 'border-white/20 bg-white/10' : 'border-white/10 bg-background-dark'}`}>
              <span className={`material-symbols-outlined text-2xl ${plan.highlighted ? 'text-white' : 'text-primary'}`}>{plan.icon}</span>
            </div>
            <h3 className={`text-2xl font-headline uppercase tracking-wide ${plan.highlighted ? 'text-white' : 'text-white'}`}>{plan.name}</h3>
          </div>
          
          <p className={`text-sm mb-8 min-h-[40px] ${plan.highlighted ? 'text-white/80' : 'text-slate-400'}`}>
            {plan.desc}
          </p>
          
          <div className="mb-8">
            <span className="text-5xl font-headline tracking-tighter">₹{isAnnual ? plan.annual.toLocaleString('en-IN') : plan.monthly.toLocaleString('en-IN')}</span>
            <span className={`text-xs uppercase tracking-widest ml-2 ${plan.highlighted ? 'text-white/60' : 'text-slate-500'}`}>
              / {isAnnual ? 'year' : 'month'}
            </span>
          </div>
          
          <div className="flex-grow">
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b ${plan.highlighted ? 'border-white/20 text-white' : 'border-white/10 text-white'}`}>
              Includes
            </h4>
            <ul className="flex flex-col gap-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-[16px] mt-0.5 ${plan.highlighted ? 'text-white' : 'text-primary'}`}>check</span>
                  <span className="text-sm leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10">
            <button className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all
              ${plan.highlighted 
                ? 'bg-black text-white hover:bg-white hover:text-black' 
                : 'bg-transparent border border-white/20 text-white hover:bg-primary hover:border-primary border-solid'
              }
            `}>
              Select Plan
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
