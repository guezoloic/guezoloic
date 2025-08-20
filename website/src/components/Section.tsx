import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
          className="fixed inset-0 z-50 backdrop-blur-xl bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 
             rounded-full flex items-center justify-center bg-black/30
             shadow-md text-white transition-transform duration-200 
             ease-out hover:scale-110 hover:bg-white/25 active:scale-95 
             active:shadow-md z-50"
          >
            <XMarkIcon className="w-4 h-4 md:w-5 md:h-5" />
          </button>


          <div className="h-full overflow-y-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-24 py-20 md:py-32"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Section;