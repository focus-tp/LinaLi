import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] bg-slate-900 flex flex-col items-center justify-center overflow-hidden text-cream">
      {/* Background Image */}
      <img 
        src="./hero.jpeg" 
        alt="Hero background" 
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[70%_center] opacity-40 pointer-events-none grayscale z-0" 
      />
      <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-accent-teal uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4 md:mb-6 block drop-shadow-md">
            Инструктор • Эксперт • Сурдопереводчик
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-4 md:mb-8 drop-shadow-lg">
            Создаю доступную среду, <span className="italic text-slate-300">обучаю через движение</span> и помогаю преодолевать травмы.
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed mb-8 md:mb-12 drop-shadow-md">
            Эвелина Литвинова — Инструктор по физической культуре, эксперт чемпионата «Абилимпикс» и тьютор-сурдопереводчик. На стыке спорта, инклюзии и наставничества.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="#about" className="inline-block bg-accent-teal text-slate-900 px-8 py-3 md:px-10 md:py-4 rounded-full text-sm md:text-base font-medium tracking-wide hover:bg-white transition-colors duration-300 shadow-xl">
            Узнать больше
          </a>
        </motion.div>
      </div>

      {/* Torn Edge Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-cream torn-edge-bottom z-20" />
    </section>
  );
}
