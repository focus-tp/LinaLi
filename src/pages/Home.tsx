import { motion } from "motion/react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import SignLanguage from "../components/sections/SignLanguage";
import Volunteer from "../components/sections/Volunteer";
import Methodology from "../components/sections/Methodology";
import Achievements from "../components/sections/Achievements";
import Programs from "../components/sections/Programs";
import PublicLife from "../components/sections/PublicLife";
import Blog from "../components/sections/Blog";
import Footer from "../components/sections/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Blog />
      <SignLanguage />
      <Volunteer />
      <Programs /> {/* Стоит идеально на новом месте */}
      <Methodology /> {/* Подняли Методику выше */}
      <Achievements /> {/* Олимп теперь под Методикой */}
      <PublicLife />
      <Footer />
    </div>
  );
}