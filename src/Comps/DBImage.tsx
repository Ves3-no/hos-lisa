import type {Image} from "../types.ts"
import {motion} from "motion/react";
export default function Main({image, DeleateImage, ChanegImage}: {image: Image, DeleateImage:any, ChanegImage: any}){
    return(<>
        <div className="h-50 flex flex-row gap-4 p-2 border border-brand-secondary w-auto rounded-lg overflow-hidden items-center">
            <img alt={""} className="h-46 object-cover rounded-lg" src={image.url}/>
            <div className="flex flex-col h-full items-center justify-center gap-px">
                <h3 className="text-lg font-bold font-heading text-brand-secondary w-full text-start">Bruk:</h3>
                <motion.select onChange={(e)=> ChanegImage(image.id, e.currentTarget.value)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} defaultValue={image.use} className="bg-brand-secondary text-brand-light cursor-pointer rounded-lg p-1">
                    <option value="carousel">Karusell</option>
                    <option value="header">Header</option>
                </motion.select>
                <motion.button onClick={()=> DeleateImage(image)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className= "w-full cursor-pointer text-brand-secondary"><svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></motion.button>
            </div>
        </div>
    </>)
}