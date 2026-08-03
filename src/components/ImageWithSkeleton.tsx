import { useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ImageWithSkeletonProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref' | 'onAnimationStart'> & {
  containerClassName?: string;
};

export default function ImageWithSkeleton({ 
  src, 
  alt, 
  className, 
  containerClassName,
  ...props 
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-surface", containerClassName, className)}>
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 w-full h-full bg-slate-800"
          >
            <motion.div
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      />
    </div>
  );
}
