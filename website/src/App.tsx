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
						<About id="about" />
						<Skills id="skills"  />
						<Projects id="projects" />
					</PageBlock>
					<div className="h-screen flex"></div>					
				</>
			)}

		</div>
	);
}

export default App;