import { motion } from "framer-motion";
import React from "react";

const PageBlock = ({ children }) => {
  return (
    <section
      className="w-full z-10 flex justify-center items-center px-6 md:px-8"
    >
      <motion.div
        className="bg-gradient-to-br mt-5 from-black/60 to-black/30 backdrop-blur-lg rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default PageBlock;