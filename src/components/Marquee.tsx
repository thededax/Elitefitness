import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  outline?: boolean;
}

export default function Marquee({ 
  items, 
  speed = 20, 
  direction = 'left', 
  className = '',
  outline = false
}: MarqueeProps) {
  const isLeft = direction === 'left';
  
  return (
    <div className={`overflow-hidden whitespace-nowrap flex py-6 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap min-w-full items-center"
        initial={{ x: isLeft ? '0%' : '-100%' }}
        animate={{ x: isLeft ? '-100%' : '0%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span 
            key={index} 
            className={`text-4xl md:text-6xl lg:text-8xl font-headline tracking-wider uppercase mx-8 
              ${outline ? 'text-outline hover:text-white transition-colors duration-300' : 'text-white/20 hover:text-primary transition-colors duration-300'}
            `}
          >
            {item}
            <span className="text-primary mx-8">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
