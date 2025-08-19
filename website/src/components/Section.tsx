import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-xl bg-black/30 text-white flex flex-col overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            key="close-btn"
            onClick={onClose}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 
             z-50 flex items-center justify-center 
             w-12 h-12 md:w-14 md:h-14 
             rounded-full backdrop-blur-lg bg-black/30 
             shadow-md text-xl md:text-2xl text-white 
             transition-all duration-200 ease-out
             hover:scale-110 hover:bg-white/25 
             active:scale-95 active:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            ✕
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-24 py-20 md:py-32"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Section;