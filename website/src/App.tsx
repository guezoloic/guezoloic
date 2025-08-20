import Navbar from "./components/Navbar";
import Three from "./components/Three";
import Section from "./components/Section"
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import PageBlock from "./components/PageBlock";

import { HomeIcon, CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	const buttons = [
		{
			label: "Home",
			icon: HomeIcon,
			action: () => {
				document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
			}
		},
		{
			label: "Skills",
			icon: CodeBracketIcon,
			action: () => {
				document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
			}
		},
		{
			label: "Projects",
			icon: FolderIcon,
			action: () => {
				document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
			}
		},
	];

	const sectionOpen = menuOpen;

	return (
		<div  className="relative w-full h-screen">
			<Three />
			<Navbar buttons={buttons} sectionOpen={sectionOpen} openNameButton={setMenuOpen} />
			<Section open={menuOpen} onClose={() => setMenuOpen(false)}><div></div></Section>
			{!sectionOpen && (
				<div className="overflow-y-scroll">
					<div className="h-screen"></div>
					<PageBlock id="home">
						<About />
					</PageBlock>
					<PageBlock id="skills">
						<Skills />
					</PageBlock>
					<PageBlock id="projects">
						<Projects sectionOpen={sectionOpen} />
					</PageBlock>
				</div>
			)}
		</div>
	);
}

export default App;