import Title from "./pages/Title";
import Three from "./pages/Three";
import Navbar from "./pages/Navbar";
import About from "./pages/About";

import Window from "./components/Window";

import { useEffect, useState } from "react";

import './utils/translation';

export type MenuState = {
    about: boolean;
    skills: boolean;
    projects: boolean;
};

export default function App() {
    const [state, setState] = useState<MenuState>({
        about: false,
        skills: false,
        projects: false,
    });

    return (
        <div className="relative w-full h-screen">
            <Three />
            <Title />
            <Navbar state={state} setState={setState} />
            <Window open={state.about} onClose={() => setState(prev => ({...prev, about: false}))}> <About id="about" /></Window>
        </div>
    );
}