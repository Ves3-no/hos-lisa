import type { product } from "../types";

import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Main({product, index} : {product: product, index:number}){
    return(
        <motion.div key={index} className="h-160 w-100 bg-brand-primary p-8 rounded-lg">
            <motion.div>
              <motion.img src={product.image_url} className="h-[60%] rounded-lg w-auto aspect-2/3 object-center object-cover"/>
            </motion.div>
            <div className="font-body text-brand-dark">
                <h1 className="font-heading text-2xl">{product.name}</h1>
                <p>{product.price}kr</p>
                <Link to={"/Product?id=" + product.id}>Se mer</Link>
            </div>
        </motion.div>
    )
}