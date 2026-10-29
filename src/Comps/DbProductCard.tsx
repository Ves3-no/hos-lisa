import { useEffect, useState } from "react";
import type { product } from "../types";

import { motion, number } from "motion/react";

export default function Main({product, setCurrentProductInEdit} : {product: product, setCurrentProductInEdit:any}){
        useEffect(()=>{
            var newlist: string[] = []
                if(product?.image_url) {newlist.push(product?.image_url)}
                if(product?.image_url_1) {newlist.push(product?.image_url_1)}
                if(product?.image_url_2) {newlist.push(product?.image_url_2)}
                setImages(newlist)
                setCurrentImage(product?.image_url)
        }, [product])
        if(!product){
            return
        }
        const [images, setImages] = useState<string[]>()
        const [currentImage, setCurrentImage] = useState<string>()

        //Editing states


    
        useEffect(()=>{
            var newlist: string[] = []
                if(product?.image_url) {newlist.push(product?.image_url)}
                if(product?.image_url_1) {newlist.push(product?.image_url_1)}
                if(product?.image_url_2) {newlist.push(product?.image_url_2)}
                setImages(newlist)
                setCurrentImage(product?.image_url)
        }, [product])
    return(
        <div className="flex flex-col lg:flex-row gap-[2%] mx-auto justify-center items-top font-body">
            <div className=" w-full">
                <div className="aspect-4/5 overflow-hidden mb-2 rounded-2xl shadow-brand-dark/40 shadow-md">
                    <motion.img whileHover={{scale: 1.125}} transition={{type: "spring", stiffness: 200, damping: 20}} src={currentImage} alt="" className="rounded-2xl"/>
                </div>
                <div className="flex justify-between">
                    {images?.map((img, index)=>(
                        <div key={index} className={`border-brand-secondary ${currentImage === img ? "border-2" : "border-0"} cursor-pointer aspect-square overflow-hidden w-[30%] rounded-xl `}>
                            <motion.img whileTap={{scale:0.975}} whileHover={{scale: 1.125}} transition={{type: "spring", stiffness: 200, damping: 20}} src={img} className="rounded-xl -mt-8" onClick={()=> setCurrentImage(img)}/>
                        </div>
                    ))}
                </div>
                </div>
            <div className="w-full">
                <input type="text" className="text-5xl md:text-6xl font-heading text-start font-semibold tracking-wide text-brand-secondary w-120" value={product.name} onChange={(e)=> setCurrentProductInEdit((prevProduct:product) => ({...prevProduct,name: e.target.value}))} />
                <p className="text-xl md:text-2xl text-brand-secondary/50 mb-4 md:mb-6"><input type="number" className="w-17" value={product.price} onChange={(e)=> setCurrentProductInEdit((prevProduct:product) => ({...prevProduct, price: Number(e.target.value)}))} />Kr</p>
                <div className="bg-brand-primary p-2 rounded-lg text-brand-light mb-4 md:mb-6" >
                    <h2 className="text-2xl text-brand-light font-heading font-semibold">Om Vesken</h2>
                    <textarea className="text-brand-dark w-full h-30" value={product.description} onChange={(e)=> setCurrentProductInEdit((prevProduct:product) => ({...prevProduct, description: e.target.value}))} />
                </div>
                <div className="flex flex-col gap-1 mb-2" >
                    <label htmlFor="" className="text-brand-secondary">Antall på lager(sett til 0 om du ikke vil ha flere bestillinger):</label>
                    <input type="number" className="btn-primary p-1 border-brand-primary" value={product.stock} onChange={(e)=> setCurrentProductInEdit((prevProduct:product) => ({...prevProduct, stock: Number(e.target.value)}))}/>
                </div>

                <motion.button className={`btn-primary ${product.stock > 0 ? "text-brand-light" : "text-brand-dark" } ${product.stock > 0 ? "bg-brand-primary" : "bg-gray-300" }`} whileHover={product.stock > 0 ?{scale: 1.05} : {}} whileTap={product.stock > 0 ? {scale: 0.97 }: {}} transition={product.stock > 0 ? { type: "spring", stiffness: 400, damping: 17 }: {}}>Legg i Handlekurv</motion.button>
                
                <p className="p-1 text-brand-secondary/80 text-xs">{Number(product.stock) > 0 ? "På lager - Kan bestilles" : "Utsolgt - Kan ikke kjøpes"}</p>
                <div className="flex flex-col md:flex-row gap-8 mt-6 md:mt-12">
                    <div className="flex flex-col justify-start items-center md:max-w-none max-w-54 mx-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 text-brand-secondary p-2 border border-brand-secondary rounded-4xl" viewBox="0 -960 960 960" fill="currentColor"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>
                        <h4 className="text-lg font-semibold font-heading text-center text-brand-secondary">Trygg betaling</h4>
                        <p className="text-xs text-center">Betal enkelt og sikkert med Stripe. Din betalingsinformasjon er alltid 100 % beskyttet.</p>
                    </div>
                    <div className="flex flex-col justify-start items-center md:max-w-none max-w-54 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 text-brand-secondary p-2 border border-brand-secondary rounded-4xl" viewBox="0 -960 960 960" fill="currentColor"><path d="M155-195q-35-35-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35q-50 0-85-35Zm113.5-56.5Q280-263 280-280t-11.5-28.5Q257-320 240-320t-28.5 11.5Q200-297 200-280t11.5 28.5Q223-240 240-240t28.5-11.5ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm628.5 108.5Q760-263 760-280t-11.5-28.5Q737-320 720-320t-28.5 11.5Q680-297 680-280t11.5 28.5Q703-240 720-240t28.5-11.5ZM680-440h170l-90-120h-80v120ZM360-540Z"/></svg>
                        <h4 className="text-lg font-semibold font-heading text-center text-brand-secondary">Rask levering</h4>
                        <p className="text-xs text-center">Vesken sys på bestilling og sendes så raskt den er ferdig. Du får sporingslenke direkte på e-post.</p>
                    </div>
                    <div className="flex flex-col justify-start items-center md:max-w-none max-w-54 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 text-brand-secondary p-2 border border-brand-secondary rounded-4xl" viewBox="0 -960 960 960" fill="currentColor"><path d="M557-518 387-688l57-56 113 113 227-226 56 56-283 283ZM320-220l278 76 238-74q-5-9-14.5-15.5T800-240H598q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T618-354l-234-86h-64v220ZM80-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L600-60l-280-78v58H80Zm80-80h80v-280h-80v280Z"/></svg>
                        <h4 className="text-lg font-semibold font-heading text-center text-brand-secondary">Håndlaget</h4>
                        <p className="text-xs text-center">Hver eneste veske er unikt håndlaget med stor nøyaktighet og kjærlighet for faget.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}