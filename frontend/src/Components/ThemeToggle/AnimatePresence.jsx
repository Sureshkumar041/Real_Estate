import { motion, AnimatePresence } from "framer-motion";
import { CiLight, CiDark } from "react-icons/ci";

<AnimatePresence mode="wait">
    {dark ? (
        <motion.div
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
            initial={{ rotate: 180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -180, scale: 0 }}
            transition={{ duration: 0.3 }}
        >
            <CiLight size={30} />
        </motion.div>
    )}
</AnimatePresence>