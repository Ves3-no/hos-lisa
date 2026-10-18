import { motion, AnimatePresence } from "framer-motion"
import type { product } from "../types"

export default function Main({cartIsOpen, setCartIsOpen, Cart}: {cartIsOpen: boolean, setCartIsOpen: any, Cart: product[]}){
    return(
        <AnimatePresence>
            {cartIsOpen ? <motion.div exit={{ left: 1000 }} /> : null}
        </AnimatePresence>
    )
}