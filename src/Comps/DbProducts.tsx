import { useState } from "react"
import type { product } from "../types"
import ProductCard from "./DbProductCard"
import { motion } from "motion/react"


export default function Main({products}: {products: product[]}){
    const [currentProductInEdit, setCurrentProductInEdit] = useState<product>(products[0])
    const [newEmptyProduct, setNewEmptyProduct] = useState<product>({
        id: "",
        created_at: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image_url: "",
        image_url_1: null,
        image_url_2: null,
    })
    return(<>
        <div className="flex flex-row overflow-hidden">
            <div className="w-[28%] max-w-100 p-4 flex flex-col gap-4 border-r-2 h-screen border-brand-secondary">
                <h1 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Produkter</h1>
                {products.map((product, index)=>(
                    <motion.div key={index} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-primary rounded-xl px-6 w-full cursor-pointer" onClick={()=>setCurrentProductInEdit(product)}>
                        <img src={product.image_url} className="w-12 object-cover object-[center_60%] aspect-square rounded-md" />
                        <h3 className="text-lg font-semibold text-brand-secondary font-heading">{product.name}</h3>
                        <p className="font-body text-brand-secondary/60">{product.price}kr</p>
                    </motion.div>
                ))}
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-primary rounded-xl px-6 w-full cursor-pointer" onClick={()=>setCurrentProductInEdit(newEmptyProduct)}>
                        <h2 className="text-lg font-semibold text-brand-secondary font-heading text-center w-full">Nytt Produkt +</h2>
                </motion.div>
                <span className="w-[90%] h-0.5 bg-brand-secondary mx-auto rounded-4xl"></span>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-secondary rounded-xl px-6 w-full cursor-pointer" onClick={()=>setCurrentProductInEdit(newEmptyProduct)}>
                        <h2 className="text-lg font-semibold text-brand-light font-heading text-center w-full">Lagre</h2>
                </motion.div>
            </div>
            <div className="w-full flex items-center flex-col p-4 gap-4 ">
                <h2 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Redigering</h2>
                <div className="border rounded-2xl p-4 h-full overflow-hidden">
                    <ProductCard product={currentProductInEdit} />
                </div>
            </div>
        </div>
    </>)
}