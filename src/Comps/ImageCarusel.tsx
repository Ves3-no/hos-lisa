import type { Image } from "../types";
import { motion } from "framer-motion";

export default function Main({images}: {images: Image[] |undefined}){
    if(!images){
        return
    }
    const duplicatedImages = [...images, ...images];
    return(
        <div className="md:py-10 py-6 bg-brand-primary overflow-hidden w-full">
            <motion.div className="flex-row flex h-60 md:h-100 md:pr-20 md:gap-20 gap-6 pr-6 overflow-hidden w-max carusell">
                {duplicatedImages.map((img, index)=>(
                    <div key={index} className="overflow-hidden aspect-11/12 shrink-0 rounded-2xl shadow-md shadow-brand-dark/40 my-2">
                        <motion.img src={img.url} className="aspect-11/12 object-cover rounded-2xl" whileHover={{scale: 1.125}} whileTap={{scale: 1.125}} transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}/>
                    </div>
                )) }
                
            </motion.div>
        </div>
    )
}