import type {Image} from "../types.ts"
import {motion} from "motion/react";
export default function Main({image}: {image: Image}){
    return(<>
        <div className="h-40 flex flex-row gap-4 p-2 border border-brand-secondary w-auto rounded-lg overflow-hidden">
            <img alt={""} className="h-36 object-cover rounded-lg" src={image.url}/>
            <select defaultValue={image.use}>
                <option value={"carousel"}>Karusell</option>
                <option value={"header"}>Header</option>
            </select>
            <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className= "cursor-pointer text-brand-secondary"><svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></motion.button>
        </div>
    </>)
}