import type { product } from "../types";

import { easeInOut, motion, spring } from "motion/react";
import { Link } from "react-router-dom";

export default function Main({product, index} : {product: product, index:number}){
    return(
        <motion.div key={index} className="h-auto w-100 bg-brand-primary p-8 rounded-lg shadow-lg shadow-brand-dark/30">
            <div className="overflow-hidden aspect-12/13 w-full">
                <motion.img whileHover={{scale: 1.125}} transition={{type: "spring", stiffness: 200, damping: 20}} src={product.image_url} className="w-full rounded-lg aspect-12/13 object-bottom object-cover"/>
            </div>
            <div className="font-body text-brand-secondary">
                <h1 className="font-heading text-2xl mt-2">{product.name}</h1>
                <p className="mt-px text-brand-secondary/50">{product.price}kr</p>
                <div className="flex flex-row justify-between mt-2">
                    <motion.a href={"/Product?id=" + product.id} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}className="btn-primary w-40 text-center">Se mer</motion.a>
                    <motion.button className="btn-secondary w-40" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Legg i handlekurv</motion.button>                             
                </div>
                </div>
        </motion.div>
    )
}