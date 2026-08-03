import { motion } from 'framer-motion';
import ImageWithSkeleton from './ImageWithSkeleton';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'The Elite Guide to Muscle Recovery',
    excerpt: 'Maximize your gains and prevent injury with these 5 proven post-workout recovery techniques used by our expert trainers.',
    category: 'Training',
    date: 'OCT 12, 2023',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 MIN READ'
  },
  {
    title: 'Nutrition Hacks for Fat Loss',
    excerpt: 'Stop dieting and start fueling. Discover how to optimize your macros without giving up the foods you love.',
    category: 'Nutrition',
    date: 'OCT 05, 2023',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
    readTime: '4 MIN READ'
  },
  {
    title: 'Why Zumba is the Ultimate Cardio',
    excerpt: 'Beyond the music and the moves—explore the science behind why Zumba burns more calories than traditional treadmill workouts.',
    category: 'Lifestyle',
    date: 'SEP 28, 2023',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
    readTime: '6 MIN READ'
  }
];

export default function BlogSection() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-4 block"
          >
            Insights & Guides
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-headline text-white uppercase leading-none"
          >
            The Elite <span className="text-primary">Journal</span>
          </motion.h2>
        </div>
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "0px 0px -100px 0px" }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/#blog" className="hidden md:inline-flex items-center gap-3 group text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Read All Articles
            <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">east</span>
          </Link>
        </motion.div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {blogPosts.map((post, i) => (
          <motion.article 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group cursor-pointer flex flex-col h-full shrink-0 w-[80vw] sm:w-[60vw] md:w-auto snap-center"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 magazine-shadow">
              <ImageWithSkeleton alt={post.title} className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-700" src={post.img} />
              <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 z-10">
                {post.category}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-primary"></span>
              <span>{post.readTime}</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-headline text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="mt-auto pt-4 border-t border-white/5">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                Read Article
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-2 transition-transform">trending_flat</span>
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      
      <div className="mt-10 md:hidden flex justify-center">
        <Link to="/#blog" className="inline-flex items-center gap-3 group text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors border border-white/20 px-8 py-4">
          Read All Articles
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-2 transition-transform">east</span>
        </Link>
      </div>
    </div>
  );
}
