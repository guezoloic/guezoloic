import Navbar from "./components/Navbar";
import Three from "./components/three";
import Section from "./components/Section"

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import About from "./components/About";

const buttons = [
	{ label: "Home", icon: HomeIcon, href: "home" },
	{ label: "About me", icon: UserIcon, href: "about" },
	{ label: "Skills", icon: CodeBracketIcon, href: "skills" },
	{ label: "Projects", icon: FolderIcon, href: "projects" },
];

function App() {
	return (
		<div className="relative w-full h-screen scrollbar-hide">
			<Three />
			<Navbar buttons={buttons} />
			<div className="relative z-10 h-screen overflow-y-scroll">
				<Section id={buttons[0].href} children="" />
				<div className="backdrop-blur-lg bg-black/30 border border-white/20 rounded-3xl shadow-md">
					<Section id={buttons[1].href}><h2 className="text-3xl text-white"><About /></h2></Section>
					<Section id={buttons[2].href}><h2 className="text-3xl text-white">third section</h2></Section>
					<Section id={buttons[3].href}><h2 className="text-3xl text-white">fourth section</h2></Section>
				</div>
			</div>
		</div>
	);
}

export default App;