import React from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, Variants } from "framer-motion";

type Button = {
  label: string;
  icon: React.ElementType;
  action: () => void;
};

type NavbarProps = {
  buttons: Button[];
  sectionOpen: boolean;
  openNameButton: (x: boolean) => void;
  closeAllSection: () => void;
  labelname: string;
};


const XVariants: Variants = {
  initial: {
    scaleY: 0.8,
    scaleX: 5,
    opacity: 0.7,
  },
  animate: {
    scaleY: 1,
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      scaleY: {
        duration: 0.7,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  },
  hover: {
    scale: 1.1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1.275]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const navVariants: Variants = {
  initial: {
    scaleY: 0.8,
    scaleX: 0.2,
    opacity: 0.7,
  },
  animate: {
    scaleY: 1,
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      scaleX: {
        duration: 0.7,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  }
};

const Navbar: React.FC<NavbarProps> = ({ buttons, sectionOpen, openNameButton, labelname, closeAllSection }) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 z-100">
      {sectionOpen ? (
        <motion.button
          onClick={closeAllSection}
          className="cursor-pointer flex items-center justify-center rounded-full backdrop-blur-lg bg-black/30 shadow-md w-12 h-12 md:w-14 md:h-14 text-white"
          variants={XVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <XMarkIcon className="w-8 h-8 text-white" />
        </motion.button>
      ) : (
        <motion.div
          className="flex items-center gap-3"
          variants={navVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative group">
            <button
              onClick={() => openNameButton(true)}
              className="cursor-pointer flex items-center justify-center backdrop-blur-lg bg-black/30 rounded-3xl shadow-md px-4 h-12 md:h-14 md:px-6 max-w-max
              hover:scale-110 hover:bg-white/25 active:scale-95 active:shadow-md"
            >
              <div className="flex flex-col items-center justify-center whitespace-nowrap">
                <span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
                  GUEZO Loïc
                </span>
                <span className="text-xs md:text-sm text-gray-300 font-light">
                  {t("me.career")}
                </span>
              </div>
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md text-xs text-white bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {labelname}
            </span>
          </div>

          <div className="flex gap-2">
            {buttons.map((btn) => (
              <div key={btn.label} className="relative group">
                <button
                  onClick={btn.action}
                  className="cursor-pointer flex items-center justify-center rounded-full backdrop-blur-lg bg-black/30 shadow-md
                       w-12 h-12 md:w-14 md:h-14 text-white transition-all duration-200 ease-out
                       hover:scale-110 hover:bg-white/25 active:scale-95 active:shadow-md"
                >
                  <btn.icon className="w-6 h-6 text-white" />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md text-xs text-white bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {btn.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;