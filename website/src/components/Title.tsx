import { motion } from "framer-motion";
import React from "react";

const Title: React.FC = () => {
  return (
    <section
      className="min-h-[35vh] flex items-center justify-center m-6"
    >
      <div className="absolute top-0 bg-transparent flex flex-col px-4 md:px-12 pt-6 md:pt-5 max-w-5xl justify-start">
        <div className="flex flex-row justify-between items-center gap-15">
          
          <motion.div
            className="text-x2l md:text-3xl font-bold text-white leading-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Hello There! 👋</h3>
            <p className="text-sm font-medium text-gray-400">GUEZO Loïc</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/guezoloic.png"
              alt="Loïc"
              loading="lazy"
              className="w-auto h-17 md:h-20 rounded-full object-cover shadow-2xl border-4 border-white/20 transform transition-transform duration-500 hover:scale-105 self-start block"
              width={96}
              height={96}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Title;