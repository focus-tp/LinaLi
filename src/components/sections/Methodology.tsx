import { motion } from "motion/react";
import { Download } from "lucide-react";

export default function Methodology() {
  const teacherMaterials = [
    { title: "Физкультминутка с элементами ЖЯ", desc: "Универсальная методика для любых возрастных групп." },
    { title: "Картотека подвижных игр", desc: "Авторские и обновленные правила игр." },
    { title: "Физическая культура в детском саду", desc: "Методический комплекс." }
  ];

  const parentMaterials = [
    { title: "Физкультминутки дома", desc: "Материалы для домашних совместных активностей." },
    { title: "Весёлая зарядка", desc: "Комплекс для бодрого начала дня." },
    { title: "Профилактика здоровья", desc: "Рекомендации по поддержанию физической формы." }
  ];

  return (
    <section id="methodology" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 mb-6">Методическая копилка</h2>
          <p className="text-slate-600">Инструмент удержания аудитории и демонстрации пользы. Практические материалы для скачивания.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* For Teachers */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-medium text-slate-900 mb-8 border-b border-slate-200 pb-4">Для педагогов</h3>
            <div className="space-y-6">
              {teacherMaterials.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4 group">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <button className="flex items-center space-x-2 text-accent-teal group-hover:text-white group-hover:bg-accent-teal align-middle px-4 py-2 rounded-full transition-all duration-300 min-w-max border border-accent-teal">
                    <span className="text-sm font-medium">Скачать</span>
                    <Download size={16} className="group-hover:animate-bounce" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Parents */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif font-medium text-slate-900 mb-8 border-b border-slate-200 pb-4">Для родителей</h3>
            <div className="space-y-6">
              {parentMaterials.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4 group">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <button className="flex items-center space-x-2 text-accent-blue group-hover:text-white group-hover:bg-accent-blue align-middle px-4 py-2 rounded-full transition-all duration-300 min-w-max border border-accent-blue">
                    <span className="text-sm font-medium">Скачать</span>
                    <Download size={16} className="group-hover:animate-bounce" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
