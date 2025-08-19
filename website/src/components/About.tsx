import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="flex flex-col px-4 md:px-12 py-12 md:py-20 max-w-5xl mx-auto">
      <div className="flex justify-between flex-row items-start md:items-center gap-4 md:gap-8">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white leading-tight"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm Loïc! 👋
        </motion.h2>

        <img
          src="/images/guezoloic.png"
          alt="Loïc"
          loading="lazy"
          className="w-auto h-14 lg:h-24 rounded-full object-cover shadow-2xl border-4 border-white/20 transform transition-transform duration-500 hover:scale-105 self-start
             hidden sm:block"
          width={96}
          height={96}
        />
      </div>

      <motion.div
        className="mt-6 md:mt-10 p-4 md:p-8 bg-black/20 rounded-xl text-gray-300 space-y-4 md:space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-base md:text-lg leading-relaxed">
          I'm passionate about <strong>low-level programming</strong> and love exploring how computers work at their core.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          I enjoy working on <strong>embedded systems, retro computing, and electronics</strong>.
          From programming in <strong>assembly (NASM)</strong> and experimenting with the <strong>6502 processor</strong> using Ben Eater's kit,
          to building AI projects on the <strong>NVIDIA Jetson Nano</strong>. I thrive on diving deep into both <strong>hardware and software</strong>.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          I'm always excited to take on <strong>new challenges</strong> and explore technologies in <strong>cybersecurity, full-stack development, machine learning</strong>, and beyond.
        </p>
      </motion.div>
    </div>
  );
};

export default About;