import { motion } from "motion/react";
import { Award, Star } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      title: "Городской конкурс «Образ_ЕКБ_Педагогический дебют- 2025»",
      result: "3 место",
      role: "в номинации «Дошкольное образование»",
      icon: <Star className="text-amber-500" />
    },
    {
      title: "Районный конкурс «Воспитатель года -2026»",
      result: "1 место",
      role: "Проведение мастер-класса «Универсальная физкультминутка с элементами жестового языка»",
      icon: <Award className="text-amber-400" />
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-cream relative">
      <div className="absolute top-0 left-0 w-full h-[60px] bg-cream torn-edge-top z-20" />
      
      <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6">Педагогический Олимп</h2>
          <p className="text-slate-300">Подтверждение экспертного статуса и достижения в сфере образования.</p>
        </div>

        <div className="space-y-6">
          {achievements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-750 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.role}</p>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/50 px-6 py-4 rounded-xl">
                {item.icon}
                <span className="font-serif text-xl font-medium text-white">{item.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-cream torn-edge-bottom z-20" />
    </section>
  );
}
