import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiLight, CiDark } from "react-icons/ci";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
    const { isDark, setIsDark } = useContext(ThemeContext);
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });;

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);

        localStorage.setItem("theme", dark ? "dark" : "light");
        setIsDark(dark)
    }, [dark]);

    return (
        <button className="theme-btn" onClick={() => setDark(!dark)}>
            <AnimatePresence mode="wait">
                {!dark ? (
                    <motion.div
                        className="dark-theme-btn theme-icon"
                        key="dark"
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 180, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CiDark size={30} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="light"
                        className="light-theme-btn theme-icon"
                        initial={{ rotate: 180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -180, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CiLight size={30} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}