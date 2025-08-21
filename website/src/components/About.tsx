import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const paragraphs = [
    "I'm passionate about low-level programming and love exploring how computers work at their core.",
    "I enjoy working on embedded systems, retro computing, and electronics. From programming in assembly (NASM) and experimenting with the 6502 processor using Ben Eater's kit, to building AI projects on the NVIDIA Jetson Nano. I thrive on diving deep into both hardware and software.",
    "I'm always excited to take on new challenges and explore technologies in cybersecurity, full-stack development, machine learning, and beyond."
  ];

  return (
      <motion.div
        className="relative z-10 max-w-4xl bg-black/40 backdrop-blur-md rounded-xl p-8 md:p-12 flex flex-col gap-6 text-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm Loïc! 👋
        </motion.h2>

        <div className="space-y-4 text-base md:text-lg">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
  );
};

export default About;