import Title from "./pages/Title";
import Three from "./pages/Three";
import Navbar from "./pages/Navbar";

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

    useEffect(() => {
        if (state.about) {
            alert("Home est activé !");
            setState(prev => ({...prev, about: false}));
        }
    }, [state.about]);


    return (
        <div className="relative w-full h-screen">
            <Three />
            <Title />
            <Navbar state={state} setState={setState} />
        </div>
    );
}