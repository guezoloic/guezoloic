import Navbar from "./components/Navbar";
import Three from "./components/Three";
import Section from "./components/Section"
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import PageBlock from "./components/PageBlock";

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Title from "./components/Title";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	const scrollFunction = (label: string) =>
		document.getElementById(label)?.scrollIntoView({ behavior: "smooth" });

	const buttons = [
		{ label: "About", icon: HomeIcon, action: () => scrollFunction("about"), },
		{ label: "Skills", icon: CodeBracketIcon, action: () => scrollFunction("skills"), },
		{ label: "Projects", icon: FolderIcon, action: () => scrollFunction("projects"), },
	];

	const sectionOpen = menuOpen;

	return (
		<div className="relative w-full h-screen">
			<Three />
			<Navbar buttons={buttons} sectionOpen={sectionOpen} openNameButton={setMenuOpen} labelname="test" />
			<Section open={menuOpen} onClose={() => setMenuOpen(false)}><div></div></Section>
			{!sectionOpen && (
				<>
					<Title />
					<PageBlock>
						<div className="bg-gradient-to-br my-5 from-black/60 to-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-4 md:p-6">
							<About id="about" />
							<Skills id="skills" />
							<Projects id="projects" />
						</div>
						<div className="h-screen flex"></div>
					</PageBlock>
					<p className="text-white">Desk: Pedro Belthori</p>
				</>
			)}

		</div>
	);
}

export default App;