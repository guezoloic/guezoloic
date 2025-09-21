import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

import content from "../json/content.json";
import * as SOLID from "@heroicons/react/24/solid";

import { Dispatch, SetStateAction } from "react";
import { MenuState } from "../App";

type NavbarProps = {
    state: MenuState;
    setState: Dispatch<SetStateAction<MenuState>>;
};

export default function Navbar({ state, setState }: NavbarProps) {
    const { t } = useTranslation();

    const handleClick = (key: keyof MenuState) => {
        setState(prev => ({ ...prev, [key]: true }));
    };

    const mainButton = content.navbar.buttons[0];

    return (
        <motion.nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-100 rounded-full">
            <div className="flex items-center gap-3">
                <Button
                    onClick={() => handleClick(mainButton.action as keyof MenuState)}
                    label={t(mainButton.label)}
                    variant="text"
                >
                    <div className="flex flex-col items-center justify-center whitespace-nowrap">
                        <span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
                            {content.name}
                        </span>
                        <span className="text-xs md:text-sm text-gray-300 font-light">
                            {t(content.career)}
                        </span>
                    </div>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                {content.navbar.buttons.slice(1).map((btn, i) => {
                    const Icon = (SOLID as Record<string, React.ElementType>)[btn.icon];
                    return (
                        <Button
                            key={i}
                            onClick={() => handleClick(btn.action as keyof MenuState)}
                            label={t(btn.label)}
                            variant="icon"
                        >
                            {Icon && <Icon className="w-6 h-6 text-white" />}
                        </Button>
                    );
                })}
            </div>
        </motion.nav>
    );
}