import { motion } from "motion/react";

export default function Programs() {
  return (
    <section className="py-24 bg-slate-900 text-cream relative">
      <div className="absolute top-0 left-0 w-full h-[60px] bg-cream torn-edge-top z-20" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-8">Программы в <span className="italic text-accent-teal">МАДОУ №33</span></h2>
            <p className="text-slate-300 mb-12 font-light text-lg">Дополнительные услуги и специализированные спортивные программы для гармоничного развития детей.</p>
            
            <div className="space-y-8">
              <div className="bg-slate-800 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <h3 className="text-2xl font-semibold mb-3 flex items-center">
                  Баскетбол малышам <span className="ml-3 text-2xl">🏀</span>
                </h3>
                <p className="text-slate-300 font-light leading-relaxed">
                  Изучение основ баскетбола (держание мяча, позиция, скорость, выносливость). Особый упор на командную игру и дружбу.
                </p>
              </div>
              
              <div className="bg-slate-800 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
                <h3 className="text-2xl font-semibold mb-3 flex items-center">
                  Фитбол <span className="ml-3 text-2xl">🏐</span>
                </h3>
                <p className="text-slate-300 font-light leading-relaxed">
                  Упражнения на растяжку, гибкость и координацию. Весёлые игры и полоса препятствий с использованием мяча.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <img 
              src="./basket.jpeg" 
              alt="Баскетбольные занятия" 
              className="w-full h-auto rounded-3xl grayscale opacity-80"
            />
          </motion.div>

        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-cream torn-edge-bottom z-20" />
    </section>
  );
}
