import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else {
      console.warn(`Элемент с id="${id}" не найден.`);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-cream/90 backdrop-blur-md border-b border-slate-200/50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between mix-blend-exclusion">
        <Link to="/" className="font-serif text-xl font-medium tracking-wide !text-white z-50 relative">
          Э. ЛИТВИНОВА
        </Link>
        {/* Десктопное меню */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium z-50 text-white relative">
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-accent-teal transition-colors cursor-pointer">Кто я</a>
          <a href="#sign-language" onClick={(e) => handleScroll(e, 'sign-language')} className="hover:text-accent-teal transition-colors cursor-pointer">Направления</a>
          <a href="#methodology" onClick={(e) => handleScroll(e, 'methodology')} className="hover:text-accent-teal transition-colors cursor-pointer">Мой подход</a>
          <a href="#blog" onClick={(e) => handleScroll(e, 'blog')} className="hover:text-accent-teal transition-colors cursor-pointer">Блог</a>
        </div>
        <button 
          className="md:hidden relative z-50 text-white p-2 -mr-2"
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
            <div className="px-6 py-8 flex flex-col space-y-6 text-center text-sm uppercase tracking-widest font-medium text-white">
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="block hover:text-accent-teal transition-colors py-2 cursor-pointer">Кто я</a>
              <a href="#sign-language" onClick={(e) => handleScroll(e, 'sign-language')} className="block hover:text-accent-teal transition-colors py-2 cursor-pointer">Направления</a>
              <a href="#methodology" onClick={(e) => handleScroll(e, 'methodology')} className="block hover:text-accent-teal transition-colors py-2 cursor-pointer">Мой подход</a>
              <a href="#blog" onClick={(e) => handleScroll(e, 'blog')} className="block hover:text-accent-teal transition-colors py-2 cursor-pointer">Блог</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}