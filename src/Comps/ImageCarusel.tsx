import { useState } from "react";
import type { Image } from "../types";
import { motion } from "framer-motion";

export default function Main({images}: {images: Image[] |undefined}){
    if (!images || images.length === 0) {
        return null;
    }
    const [duplicatedImages] = useState<Image[]>([...images, ...images])
    return(
        <div className="md:py-10 py-6 bg-brand-primary overflow-hidden w-full">
            <div className="overflow-hidden w-full">
                <motion.div className={`flex flex-row h-100 md:h-100 gap-6`} style={{ willChange: 'transform', width: images.length * (320 + 24) * 2}} animate={{x: ['0%', '-50%'],}} transition={{ repeat: Infinity, ease: 'linear', duration: images.length * 2.5}}>
                    {duplicatedImages.map((img, index)=>(
                        <div key={index} className="overflow-hidden aspect-11/14 w-80 shrink-0 bg-brand-dark/10 rounded-2xl shadow-md shadow-brand-dark/40 my-2">
                            <motion.img loading="lazy" src={img.url} className="w-full h-full object-cover rounded-2xl" whileHover={{scale: 1.125}} whileTap={{scale: 1.125}} transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}/>
                        </div>
                    )) }
                </motion.div>
            </div>
        </div>
    )
}