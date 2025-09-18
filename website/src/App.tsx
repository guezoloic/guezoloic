import Navbar from "./components/Navbar";
import Three from "./components/Three";
import Window from "./components/Window";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Title from "./components/Title";
import Social from "./components/Social";

import { HomeIcon, CodeBracketIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import './translation';
import { useTranslation } from 'react-i18next';

function App() {
	const { t } = useTranslation();

	const [menuOpen, setMenuOpen] = useState(false);
	const [aboutOpen, setAboutOpen] = useState(false);
	const [skillsOpen, setSkillsOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);

	const scrollFunction = (label: string) =>
		document.getElementById(label)?.scrollIntoView({ behavior: "smooth" });

	const buttons = [
		{ label: t("about.label"), icon: HomeIcon, action: () => setAboutOpen(true), },
		{ label: t("skills.label"), icon: CodeBracketIcon, action: () => setSkillsOpen(true), },
		{ label: t("projects.label"), icon: FolderIcon, action: () => setProjectsOpen(true), },
	];

	const sectionOpen = menuOpen || aboutOpen || skillsOpen || projectsOpen;

	const closeAllSections = () => {
		setMenuOpen(false);
		setAboutOpen(false);
		setSkillsOpen(false);
		setProjectsOpen(false);
	};

	return (
		<div className="relative w-full h-screen">
			<Title />
			<Three />
			<Navbar buttons={buttons} 
					sectionOpen={sectionOpen} 
					openNameButton={setMenuOpen} 
					closeAllSection={closeAllSections} 
					labelname={t("links.label")} />
			<Window open={menuOpen} onClose={() => setMenuOpen(false)}><Social id="socials" /></Window>
			<Window open={aboutOpen} onClose={() => setAboutOpen(false)}> <About id="about" /></Window>
			<Window open={skillsOpen} onClose={() => setSkillsOpen(false)}> <Skills id="skills" /></Window>
			<Window open={projectsOpen} onClose={() => setProjectsOpen(false)}> <Projects id="projects" /></Window>
		</div>
	);
}

export default App;