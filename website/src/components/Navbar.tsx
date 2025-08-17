import React, { useState } from "react";
import About from "./About";

type Button = {
	label: string;
	icon: React.ElementType;
	href: string;
};

type NavbarProps = {
  buttons: Button[];
  onOpenAbout: () => void;
};


const Navbar: React.FC<NavbarProps> = ({ buttons, onOpenAbout }) => {
	const [aboutOpen, setAboutOpen] = useState(false);

	return (
		<nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
			<div className="relative">
				<button
					onClick={onOpenAbout}
					className="cursor-pointer flex items-center justify-center backdrop-blur-lg bg-black/30 rounded-3xl shadow-md px-4 h-12 md:h-14 md:px-6 max-w-max transition-all duration-200 hover:scale-105
					hover:bg-white/25
                 	active:scale-95 active:shadow-md"
				>
					<div className="flex flex-col items-center justify-center whitespace-nowrap">
						<span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
							GUEZO Loïc
						</span>
						<span className="text-xs md:text-sm text-gray-300 font-light">
							IT Student
						</span>
					</div>
				</button>
			</div>

			<div className="flex gap-2">
				{buttons.map((btn) => (
					<a
						key={btn.label}
						href={"#" + btn.href}
						title={btn.label}
						className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-lg bg-black/30 shadow-md text-xl md:text-2xl text-white transition-all duration-200 ease-out
                 hover:scale-110 hover:bg-white/25
                 active:scale-95 active:shadow-md"
					>
						<btn.icon className="w-6 h-6 text-white" />
					</a>
				))}
			</div>
		</nav>
	);
};

export default Navbar;