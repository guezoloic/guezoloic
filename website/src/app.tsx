import Navbar from "./components/Navbar";
import Three from "./components/three";
import Section from "./components/Section"
import Projects from "./components/Projects";
import About from "./components/About";

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const buttons = [
	{ label: "Home", icon: HomeIcon, href: "home" },
	{ label: "Skills", icon: CodeBracketIcon, href: "skills" },
	{ label: "Projects", icon: FolderIcon, href: "projects" },
];

function App() {
	const [aboutOpen, setAboutOpen] = useState(false);

	return (
		<div className="relative w-full h-screen scrollbar-hide">
			<Three />
			<Navbar buttons={buttons} onOpenAbout={() => setAboutOpen(true)} />
      		<About open={aboutOpen} onClose={() => setAboutOpen(false)} />
				
			<div className="relative z-10 h-screen overflow-y-scroll">
				<Section id={buttons[0].href} children="" />
				<div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-3xl shadow-md">
					<Section id={buttons[1].href}><h2 className="text-3xl text-white">third section</h2></Section>
					<Section id={buttons[2].href}><Projects /></Section>
				</div>
			</div>
		</div>
	);
}

export default App;