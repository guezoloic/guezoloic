import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutProps {
  open: boolean;
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-xl bg-black/30 text-white flex flex-col overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl z-50"
          >
            ✕
          </button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-24 py-20 md:py-32"
          >
            <div className="md:w-1/2 flex flex-col space-y-6 md:space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Hi, I'm Loïc! 👋
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I'm passionate about <strong>low-level programming</strong> and love
                  exploring how computers work at their core.
                </p>
              </div>

              <div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I enjoy working on
                  <strong>embedded systems, retro computing, and electronics</strong>.
                  From programming in <strong>assembly (NASM)</strong> and experimenting
                  with the <strong>6502 processor</strong> using Ben Eater's kit, to
                  building AI projects on the <strong>NVIDIA Jetson Nano</strong>. I
                  thrive on diving deep into both <strong>hardware and software</strong>.
                </p>
              </div>

              <div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I'm always excited to take on <strong>new challenges</strong> and explore
                  technologies in
                  <strong>
                    cybersecurity, full-stack development, machine learning
                  </strong>
                  , and beyond.
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src="/images/guezoloic.png"
                alt="Loïc"
                className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white/20 transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default About;