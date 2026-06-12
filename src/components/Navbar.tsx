import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-md border-b border-slate-200/50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between mix-blend-exclusion">
        <Link to="/" className="font-serif text-xl font-medium tracking-wide !text-white z-10 text-white relative z-50">
          Э. ЛИТВИНОВА
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium z-10 text-white relative z-50">
          <a href="#about" className="hover:text-accent-teal transition-colors">Обо мне</a>
          <a href="#volunteer" className="hover:text-accent-teal transition-colors">Семьи</a>
          <a href="#methodology" className="hover:text-accent-teal transition-colors">Методика</a>
          <a href="#blog" className="hover:text-accent-teal transition-colors">Блог</a>
        </div>
        <button 
          className="md:hidden relative z-50 text-white p-2 -mr-2 mix-blend-exclusion"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900"
          >
            <div className="px-6 py-8 flex flex-col space-y-6 text-center text-sm uppercase tracking-widest font-medium text-white mix-blend-exclusion">
              <a href="#about" onClick={() => setIsOpen(false)} className="block hover:text-accent-teal transition-colors py-2">Обо мне</a>
              <a href="#volunteer" onClick={() => setIsOpen(false)} className="block hover:text-accent-teal transition-colors py-2">Семьи</a>
              <a href="#methodology" onClick={() => setIsOpen(false)} className="block hover:text-accent-teal transition-colors py-2">Методика</a>
              <a href="#blog" onClick={() => setIsOpen(false)} className="block hover:text-accent-teal transition-colors py-2">Блог</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
