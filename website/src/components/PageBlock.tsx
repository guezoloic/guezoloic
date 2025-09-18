import { motion } from "framer-motion";
import React, { JSX } from "react";

interface PageBlockProps {
  children: React.ReactNode;
}

const PageBlock: React.FC<PageBlockProps> = ({ children }) => {
  const isMobile = window.innerWidth < 768;
  const viewportAmount = isMobile ? 0.1 : 0.2;

  return (
    <section className="w-full z-10 flex justify-center items-center sm:px-4 md:px-8">
      <motion.div
        className="w-full max-w-lg md:max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: viewportAmount, once: false }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default PageBlock;