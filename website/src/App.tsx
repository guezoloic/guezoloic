import Title from "./pages/Title";
import Three from "./pages/Three";
import Navbar from "./pages/Navbar";

import { useState } from "react";

import './utils/translation';

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(false);


    return (
        <div className="relative w-full h-screen">
            <Three />
            <Title />
            <Navbar buttons={{
                openAbout: () => {
                    if (true) alert("About clicked");
                    setAboutOpen(true);
                },
                openSkills: () => {
                    if (true) alert("Skills clicked");
                    setSkillsOpen(true);
                },
                openProjects: () => {
                    if (true) alert("Projects clicked");
                    setProjectsOpen(true);
                },
                openTest: () => {
                    if (true) alert("test clicked");
                    setMenuOpen(true);
                }
            }} />
        </div>
    );
}