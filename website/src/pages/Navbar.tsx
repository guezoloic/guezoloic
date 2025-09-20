import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

import content from "../json/content.json";
import { HomeIcon, CodeBracketIcon, FolderIcon } from "@heroicons/react/24/solid";


const iconMap: Record<string, React.ElementType> = {
    HomeIcon,
    CodeBracketIcon,
    FolderIcon
};

type NavbarProps = {
    buttons: Record<string, () => void>;
};

export default function Navbar({ buttons }: NavbarProps) {
    const { t } = useTranslation();
    const buttonsData = content.navbar.buttons;

    const mainButton = content.navbar.buttons[0];
    const mainOnClick = buttons[mainButton.action];

    return (
        <motion.nav className=" fixed bottom-4 left-1/2 transform
                                -translate-x-1/2 flex 
                                items-center gap-2 z-100 rounded-full">
            <div className="flex items-center gap-3">
                <Button onClick={mainOnClick} label={mainButton.label} variant="text">
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
                {buttonsData.slice(1).map((btn, i) => {
                    const Icon = iconMap[btn.icon];
                    const onClick = buttons[btn.action]

                    return (
                        <Button key={i} onClick={onClick} label={btn.label} variant="icon">
                            <Icon className="w-6 h-6 text-white" />
                        </Button>
                    );
                })}
            </div>
        </motion.nav >
    )
}