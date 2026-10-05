import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  // Membuat animasi scroll menjadi lebih halus (spring)
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Garis Progress di paling atas */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" 
        style={{ scaleX }} 
      />
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-bold text-xl text-slate-900 tracking-tight">
            Iqbal<span className="text-blue-600">.</span>
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Layanan</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Proyek</a>
          </div>
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300">
            Hubungi Saya
          </a>
        </div>
      </nav>
    </>
  );
}