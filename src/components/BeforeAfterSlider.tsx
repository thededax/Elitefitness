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
        className="relative w-full aspect-square md:aspect-video overflow-hidden magazine-shadow cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest-plus border border-white/10 z-10">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div 
          className="absolute inset-0 border-r-2 border-primary"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover opacity-90" draggable={false} />
          <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest-plus border border-white/10 z-10">
            {beforeLabel}
          </div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 flex items-center justify-center -translate-x-1/2 pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-surface border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(230,57,70,0.5)] glow-red flex-col gap-0.5 md:gap-1">
            <div className="flex gap-1">
              <span className="material-symbols-outlined text-primary text-[10px] md:text-xs">chevron_left</span>
              <span className="material-symbols-outlined text-primary text-[10px] md:text-xs">chevron_right</span>
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
