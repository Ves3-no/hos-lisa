import { useSearchParams } from "react-router-dom";
import type { product } from "../types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Main({Products}: {Products: product[]}){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  
    const [product, setProduct] = useState<product>()
    const [images, setImages] = useState<string[]>()
    const [currentImage, setCurrentImage] = useState<string>()
    const [number, setNumber] = useState<number>(1)

    useEffect(()=>{
        if(Products[0]){
            const productId = searchParams.get("id");
            const prod = Products?.find((prod) => prod.id == productId )
            if(prod){
                setProduct(prod)
                var newlist: string[] = []
                if(product?.image_url) {newlist.push(product?.image_url)}
                if(product?.image_url_1) {newlist.push(product?.image_url_1)}
                if(product?.image_url_2) {newlist.push(product?.image_url_2)}
                setImages(newlist)
                setCurrentImage(product?.image_url)
            } else{
                setProduct(undefined)
            }
        }
    }, [Products])
    
    useEffect(()=>{ if(product == undefined && Products[0]) navigate("/")},[product])

    return(
        <div className="p-8 mt-20 flex gap-[2%] mx-auto w-[80%] justify-center items-top">
            <div className="w-[35%]">
                <div className="aspect-4/5 overflow-hidden mb-2 rounded-2xl shadow-brand-dark/40 shadow-md">
                    <motion.img whileHover={{scale: 1.125}} transition={{type: "spring", stiffness: 200, damping: 20}} src={currentImage} alt="" className="rounded-2xl"/>
                </div>
                <div className="flex justify-between">
                    {images?.map((img, index)=>(
                        <div key={index} className={`border-brand-secondary ${currentImage === img ? "border-2" : "border-0"} aspect-square overflow-hidden w-[30%] rounded-xl `}>
                            <motion.img whileHover={{scale: 1.125}} transition={{type: "spring", stiffness: 200, damping: 20}} src={img} className="rounded-xl -mt-8" onClick={()=> setCurrentImage(img)}/>
                        </div>
                    ))}
                </div>
                </div>
            <div className="w-[40%]">
                <h1 className="text-6xl font-heading text-start font-semibold tracking-wide text-brand-secondary ">{product?.name}</h1>
                <p className="text-2xl text-brand-secondary/50 mb-4">{product?.price}Kr</p>
                <div className="bg-brand-primary p-2 rounded-lg text-brand-light mb-6">
                    <h2 className="text-xl text-brand-secondary">Om vesken</h2>
                    <p className="text-brand-dark">{product?.description}</p>
                </div>

                <div className="flex flex-col gap-1 mb-2" >
                    <label htmlFor="" className="text-brand-secondary">Antall:</label>
                    <input type="number" className="btn-primary p-1 border-brand-primary" value={number} onChange={(e)=> setNumber(Number(e.currentTarget.value))}/>
                </div>

                <motion.button className="btn-primary bg-brand-primary text-brand-light" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Legg i Handlekurv</motion.button>
                <p className="p-1 text-brand-secondary/80 text-xs">{Number(product?.stock) > 0 ? "På lager - Kan bestilles" : "Utsolgt - Kan ikke kjøpes"}</p>
            </div>
        </div>
    )
}