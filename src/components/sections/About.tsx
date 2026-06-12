import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="pt-24 pb-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Фото */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <img 
              src="/elina.jpeg" 
              alt="Эвелина Литвинова" 
              className="w-full h-auto rounded-2xl shadow-lg object-cover" 
            />
          </motion.div>

          {/* Текст и достижения */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 leading-tight">
                Кто <span className="text-accent-teal italic">я?</span>
              </h2>
              
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-light">
                <p>
                  Я инструктор по физической культуре в детском саду №33 города Екатеринбурга. Также состою в молодёжном совете Свердловской области чемпионата «Абилимпикс» и являюсь региональным экспертом данного чемпионата в компетенции «Физическая культура».
                </p>
                <p>
                  Принимаю активное участие в педагогических конкурсах. Была участницей и победительницей регионального этапа конкурса «WorldSkills» в 2020 году в номинации «Учитель физической культуры». 
                </p>
                <p>
                  Выступаю с жестовым пением на разных мероприятиях. Выполняю обязанности тьютора-переводчика русского жестового языка для ребят с нарушениями слуха на форумах, организованных Росмолодёжью.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Бегущая строка */}
      <div className="w-full bg-cyan-900/5 py-8 border-y border-cyan-900/10">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          <div className="flex px-4">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-serif text-2xl lg:text-3xl text-cyan-800 pr-8">
                🏆 Победитель WorldSkills 2020 <span className="mx-4 sm:mx-8 text-cyan-300/60">•</span> 🌟 Эксперт Абилимпикс <span className="mx-4 sm:mx-8 text-cyan-300/60">•</span> 🤝 Тьютор Росмолодёжь <span className="mx-4 sm:mx-8 text-cyan-300/60">•</span> 🏃‍♀️ Инструктор МАДОУ №33 <span className="mx-4 sm:mx-8 text-cyan-300/60">•</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
