import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Default reset
      let variant = 'default';

      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('magazine-shadow')
      ) {
        variant = 'pointer';
      }

      const closestImage = target.closest('img') || target.tagName.toLowerCase() === 'img';
      // If we are looking at gallery specifically we'll add crosshair
      if (closestImage) {
        variant = 'crosshair';
      }

      setCursorVariant(variant);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide default cursor on desktop
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: cursorVariant === 'pointer' ? 2 : cursorVariant === 'crosshair' ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary rounded-full pointer-events-none z-[9998] hidden md:block flex items-center justify-center p-2"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: cursorVariant === 'pointer' ? 1.5 : cursorVariant === 'crosshair' ? 1.2 : 1,
          opacity: cursorVariant === 'pointer' ? 0 : 1,
          borderRadius: cursorVariant === 'crosshair' ? '0%' : '50%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
      >
        {cursorVariant === 'crosshair' && (
           <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full relative"
           >
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-primary -translate-x-1/2"></div>
           </motion.div>
        )}
      </motion.div>
    </>
  );
}
