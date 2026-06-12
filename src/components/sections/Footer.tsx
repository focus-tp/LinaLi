import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-white mb-6">Связь со мной</h2>
          <div className="space-y-4">
            <a href="mailto:litvinovalina479@gmail.com" className="flex items-center space-x-3 hover:text-accent-teal transition-colors w-fit">
              <Mail size={20} className="text-accent-teal" />
              <span>litvinovalina479@gmail.com</span>
            </a>
            <a href="tel:+79911997624" className="flex items-center space-x-3 hover:text-accent-teal transition-colors w-fit">
              <Phone size={20} className="text-accent-teal" />
              <span>+79911997624</span>
            </a>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-slate-500 mb-4">&copy; {new Date().getFullYear()} Эвелина Литвинова. Все права защищены.</p>
          <Link to="/admin" className="text-sm text-slate-500 hover:text-white transition-colors underline underline-offset-4">Войти в панель управления</Link>
        </div>
      </div>
    </footer>
  );
}
