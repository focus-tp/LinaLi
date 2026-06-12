import { motion } from "motion/react";

export default function PublicLife() {
  const forums = [
    {
      year: "2025",
      title: "Форум молодых педагогов",
      role: "Спикер блока «Лаборатория наставничества». Презентация подходов к невербальной коммуникации совместно с Ольгой Семёновой."
    },
    {
      year: "2024",
      title: "АТР «Алтай. Территория развития»",
      role: "Сопровождение участников с нарушениями слуха, организация инклюзивной площадки «Добра», проведение мастер-класса по РЖЯ."
    },
    {
      year: "2023",
      title: "Молодёжный форум «Амур» (г. Хабаровск)",
      role: "Приглашенный тьютор сурдопереводчик. Работа с командами, проектирование."
    },
    {
      year: "Ежегодно",
      title: "IV Молодежный форум «Абилимпикс»",
      role: "Спикер площадки «МОЙ ВЕКТОР», выступление с темой «Музыка, которую видно»."
    }
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 mb-4">Общественная жизнь и Форумы</h2>
          <p className="text-slate-600">Вне стен учреждения. Мобильность и федеральный уровень эксперта.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {forums.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-[3px] border-accent-teal pl-6 py-2"
            >
              <span className="text-sm font-semibold text-accent-teal tracking-wider uppercase mb-2 block">{item.year}</span>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 font-light leading-relaxed">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
