import { motion } from "motion/react";
import { Mic2, Music } from "lucide-react";

export default function SignLanguage() {
  return (
    <section className="py-24 bg-slate-900 text-cream relative">
      {/* Top Torn Edge */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-cream torn-edge-top z-20" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent-teal uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Ключевая уникальность</span>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6">Сурдоперевод & Искусство жестового пения</h2>
          <p className="text-slate-300 text-lg font-light">
            С 2020 года я стала тьютором-переводчиком для людей с нарушением слуха. Принимаю участие в различных Всероссийских форумах, где необходима работа переводчика.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-800 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-accent-teal group-hover:scale-110 transition-transform duration-700">
              <Mic2 size={120} />
            </div>
            <h3 className="text-2xl font-serif font-medium mb-4 text-white relative z-10">Искусство Жестового пения</h3>
            <p className="text-slate-300 font-light leading-relaxed mb-6 relative z-10">
              Выступаю как солистка и дуэт-партнер в жанре жестового пения совместно с ребятами, имеющими нарушение слуха. Жестовое пение — это искусство выразительное, эмоциональное и удивительно красивое.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-accent-teal group-hover:scale-110 transition-transform duration-700">
              <Music size={120} />
            </div>
            <h3 className="text-2xl font-serif font-medium mb-4 text-white relative z-10">Ключевые выступления</h3>
            <ul className="space-y-4 text-slate-300 font-light relative z-10">
              <li className="flex items-start">
                <span className="text-accent-teal mr-3 mt-1">•</span>
                <span>Фрагмент сольного выступления с песней «Матушка Земля» (Торжественное мероприятие в ЦК «Урал»).</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-teal mr-3 mt-1">•</span>
                <span>Фрагмент выступления дуэтом с Комковым Иваном с песней «Как любовь твою понять?» на Дне города Екатеринбурга.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Torn Edge */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-cream torn-edge-bottom z-20" />
    </section>
  );
}
