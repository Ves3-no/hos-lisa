import type { Image } from "../types";
import { motion } from "framer-motion";

export default function Main({images}: {images: Image[] |undefined}){
    if (!images || images.length === 0) {
        return null;
    }
    const duplicatedImages = [...images, ...images];
    return(
        <div className="md:py-8 py-4 bg-brand-primary overflow-hidden w-full">
            <div className="overflow-hidden w-screen py-2">
                <motion.div className="flex flex-row h-80 w-max gap-6 md:gap-10" style={{ willChange: 'transform' }} animate={{x: ['0%', '-50%'],}} transition={{ repeat: Infinity, ease: 'linear', duration: images.length * 2.5}}>
                    {duplicatedImages.map((img, index)=>(
                        <div key={`${img.url}-${index}`} className="overflow-hidden w-[14vw] aspect-11/14 rounded-2xl shadow-md shadow-brand-dark/40">
                            <motion.img src={img.url} className="h-full w-full object-cover object-bottom rounded-2xl" whileHover={{scale: 1.125}} whileTap={{scale: 1.125}} transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}/>
                        </div>
                    )) }
                </motion.div>
            </div>
        </div>
    )
}