import { useState } from "react";
import type { product } from "../types";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard"

export default function Main({products}: {products: product[]  | undefined}){
    const [currentIndex, setCurrentIndex] = useState(0);


    if (!products || products.length === 0) {
        return null;
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return(
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-5 py-4 h-160">
            <div className="relative h-140 w-full flex items-center justify-center">
                {products.map((product, index) => {
                    let offset = index - currentIndex;
                    if (offset > 1) offset -= products.length;
                    if (offset < -1) offset += products.length;

                    const isVisible = Math.abs(offset) <= 1;
                    if (!isVisible) return null;

                    return (
                        <motion.div className="absolute" key={product.id} initial={false} animate={{x: offset * 340, scale: offset === 0 ? 1 : 0.85,opacity: offset === 0 ? 1 : 0.4, zIndex: offset === 0 ? 10 : 1,}}transition={{ duration: 0.4, ease: "easeInOut" }} onClick={() => setCurrentIndex(index)} >
                            <ProductCard product={product} index={index} />
                        </motion.div>
                    )
                })}
            </div>

            <div className="flex items-center gap-6 mt-6">
                <motion.button onClick={handlePrev} className="btn w-30 bg-brand-primary text-brand-dark border-brand-primary cursor-pointer" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} > ← Forgje</motion.button>
                <span className="text-sm font-medium text-brand-dark/50"> {currentIndex + 1} av {products.length}</span>
                <motion.button onClick={handleNext} className="btn w-30 bg-brand-primary text-brand-dark border-brand-primary cursor-pointer" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} >Neste →</motion.button>
            </div>
        </div>
    )
}