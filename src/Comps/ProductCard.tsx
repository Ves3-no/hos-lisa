import type { product } from "../types";

import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Main({product, index} : {product: product, index:number}){
    return(
        <motion.div key={index}>
            <motion.div>
              <motion.img src={product.image_url} />
            </motion.div>
            <div>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <Link to={"/Product?id=" + product.id}>Se mer</Link>
            </div>
        </motion.div>
    )
}