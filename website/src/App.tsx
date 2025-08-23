import Navbar from "./components/Navbar";
import Three from "./components/Three";
import Section from "./components/Section";
import Window from "./components/Window";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import PageBlock from "./components/PageBlock";
import Title from "./components/Title";
import Acknowledgement from "./components/Acknowledge";

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import SocialLinks from "./components/SocialLink";

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
			<Navbar buttons={buttons} sectionOpen={sectionOpen} openNameButton={setMenuOpen} labelname="Links" />
			<Window open={menuOpen} onClose={() => setMenuOpen(false)}><SocialLinks id="socials"/></Window>
			{!sectionOpen && (
				<>
					<Title />
					<PageBlock>
						<div className="bg-gradient-to-br my-5 from-black/60 to-black/30 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6">
							<About id="about" />
							<Skills id="skills" />
							<Projects id="projects" />
							<Acknowledgement id="acknowlegement"/>
						</div>
						<div className="h-screen flex"></div>
					</PageBlock>

				</>
			)}

		</div>
	);
}

export default App;