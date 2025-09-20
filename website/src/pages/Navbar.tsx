import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

export default function Navbar() {
    const { t } = useTranslation();

    return (
        <motion.nav className=" fixed bottom-4 left-1/2 transform
                                -translate-x-1/2 z-50 flex 
                                items-center gap-3 z-100 rounded-full">
            <div className="flex items-center gap-3">
                <Button onClick={() => 1} label="links" variant="text">
                    <div className="flex flex-col items-center justify-center whitespace-nowrap">
                        <span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
                            GUEZO Loïc
                        </span>
                        <span className="text-xs md:text-sm text-gray-300 font-light">
                            {t("me.career")}
                        </span>
                    </div>
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Button onClick={() => 1} label="links">
                    1
                </Button>
            </div>
        </motion.nav>
    )
}