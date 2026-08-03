import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background-dark flex items-center justify-center flex-col gap-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              scale: { type: "spring", damping: 15, stiffness: 100 }
            }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <motion.span 
                initial={{ rotate: -45, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="material-symbols-outlined text-primary text-6xl md:text-8xl fill-1 block"
              >
                fitness_center
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-white text-4xl md:text-6xl font-headline tracking-[0.2em] uppercase">
                ELITE
              </h1>
              <div className="overflow-hidden mt-2">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                  className="h-[2px] w-full bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
              Loading Excellence
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
