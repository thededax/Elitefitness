import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Day 1',
  afterLabel = 'Day 90',
  title = 'Real Results'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center w-full max-w-4xl mx-auto"
    >
      <h3 className="text-3xl md:text-5xl font-headline text-white uppercase mb-8 md:mb-12">
        {title.split(' ')[0]} <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
      </h3>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl aspect-[1024/985] rounded-2xl overflow-hidden border border-white/10 magazine-shadow cursor-ew-resize select-none touch-none mx-auto bg-black"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover object-center" draggable={false} />
          <div className="absolute top-3 md:top-6 right-3 md:right-6 bg-black/85 backdrop-blur-md text-[var(--accent-secondary,#FF2E44)] px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider border border-[var(--accent-primary,#D70015)]/40 z-10 rounded-lg shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div 
          className="absolute inset-0 border-r-2 border-[var(--accent-primary,#D70015)]"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover object-center" draggable={false} />
          <div className="absolute top-3 md:top-6 left-3 md:left-6 bg-black/85 backdrop-blur-md text-white px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider border border-white/20 z-10 rounded-lg shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 flex items-center justify-center -translate-x-1/2 pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-black/90 border-2 border-[var(--accent-primary,#D70015)] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(215,0,21,0.6)] flex-col gap-0.5 pointer-events-auto cursor-ew-resize backdrop-blur-md">
            <div className="flex gap-0.5">
              <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-xs">chevron_left</span>
              <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-xs">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 text-xs md:text-sm">
        <span className="material-symbols-outlined text-ms">swipe</span>
        <span>Drag to see transformation</span>
      </div>
    </motion.div>
  );
}
