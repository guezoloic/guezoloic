import React from "react";

type Button = {
  label: string;
  icon: React.ElementType;
  action: () => void;
};

type NavbarProps = {
  buttons: Button[];
  sectionOpen: boolean; 
};

const Navbar: React.FC<NavbarProps> = ({ buttons, sectionOpen }) => {
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
      <div className="relative">
        <div
          className="flex items-center justify-center backdrop-blur-lg bg-black/30 rounded-3xl shadow-md px-4 h-12 md:h-14 md:px-6 max-w-max"
        >
          <div className="flex flex-col items-center justify-center whitespace-nowrap">
            <span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
              GUEZO Loïc
            </span>
            <span className="text-xs md:text-sm text-gray-300 font-light">
              IT Student
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            title={btn.label}
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-lg bg-black/30 shadow-md text-xl md:text-2xl text-white transition-all duration-200 ease-out
                       hover:scale-110 hover:bg-white/25 active:scale-95 active:shadow-md"
			tabIndex={sectionOpen ? -1 : 0}
          >
            <btn.icon className="w-6 h-6 text-white" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;