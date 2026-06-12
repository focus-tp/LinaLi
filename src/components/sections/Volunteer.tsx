import { motion } from "motion/react";

export default function Volunteer() {
  return (
    <section id="volunteer" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 mb-6 max-w-2xl">
            Волонтерская деятельность и работа с <span className="italic text-accent-teal">приёмными семьями</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center h-full">
              <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4">Семейный лагерь «Связь» (2023–2025)</h3>
              <p className="text-slate-600 leading-relaxed font-light mb-4">
                Получила приглашение стать наставником-волонтёром в лагере для приёмных семей «Связь», который проводится ежегодно. Наша главная задача с командой — поиск контакта с наставляемым ребенком и коррекция его поведения. 
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Дети, пережившие смерть родных, пренебрежение, жизнь в детском доме, являются заложниками детских травм.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-l-accent-teal">
              <h4 className="font-semibold text-slate-900 mb-2">Специализация</h4>
              <p className="text-slate-600 font-light text-sm">В 2022 году успешно завершила обучение по специальности «Специалист по работе с детской травмой».</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-l-accent-blue">
              <h4 className="font-semibold text-slate-900 mb-2">Екатеринбург</h4>
              <p className="text-slate-600 font-light text-sm">Выступаю в роли наставника и регулярно взаимодействую с приёмными детьми в группе поддержки родителей.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
