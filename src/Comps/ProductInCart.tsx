import type {  ProductInCart } from "../types";
import { motion } from "motion/react";


export default function Main({product, index, removeFromCart} : {product: ProductInCart, index:number, removeFromCart:any}){
    return(
        <div key={index} className="flex flex-row gap-2 items-center justify-center p-3 bg-brand-light rounded-xl px-6 w-full">
            <img src={product.Product.image_url ?? ""} className="w-12 object-cover object-[center_60%] aspect-square rounded-md" />
            <div className="flex flex-col justify-center items-start">
                <div className="flex items-baseline justify-between gap-2 -mb-1">
                    <h3 className="text-lg font-semibold text-brand-secondary font-heading">{product.Product.name}</h3>
                    <p className="font-body text-brand-secondary/60 ">{product.engraved_name ? product.Product.price + 49 : product.Product.price }kr</p>
                </div>
                {product.with_engraved_name == true ? <p className="text-xs text-brand-secondary/80">Med ingravert navn, "{product.engraved_name}"</p> : <></>}
            </div>
            <motion.button onClick={()=>removeFromCart(product)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className= "cursor-pointer text-brand-secondary"><svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></motion.button>
        </div>
    )
}