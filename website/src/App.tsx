import Navbar from "./components/Navbar";
import Three from "./components/Three";
import Section from "./components/Section"
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function App() {
	const [aboutOpen, setAboutOpen] = useState(false);
	const [skillsOpen, setSkillsOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);

	const buttons = [
		{ label: "Home", icon: HomeIcon, action: () => setAboutOpen(true) },
		{ label: "Skills", icon: CodeBracketIcon, action: () => setSkillsOpen(true) },
		{ label: "Projects", icon: FolderIcon, action: () => setProjectsOpen(true) },
	];

	const sectionOpen = aboutOpen || skillsOpen || projectsOpen;

	return (
		<div className="relative w-full h-screen">
			{!sectionOpen && <div id="scrollContainer" className="h-[200vh]"></div>}
			<Three />
			<Navbar buttons={buttons} sectionOpen={aboutOpen || skillsOpen || projectsOpen}/>
			<Section open={aboutOpen} onClose={() => setAboutOpen(false)}>
				<About />
			</Section>
			<Section open={skillsOpen} onClose={() => setSkillsOpen(false)}>
				<Skills />
			</Section>
			<Section open={projectsOpen} onClose={() => setProjectsOpen(false)}>
				<Projects />
			</Section>
		</div>
	);
}

export default App;