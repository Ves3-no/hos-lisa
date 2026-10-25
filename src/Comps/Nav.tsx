import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import logo from "/843339068_18117228145909344_2576512124900151496_n.jpg"



export default function Main({setCartIsOpen, cartIsOpen}: {setCartIsOpen: any, cartIsOpen: boolean}){
    return(
        <nav className={`h-20 -mb-20 flex flex-row justify-between items-center px-16 bg-brand-primary sticky top-2.5 w-[60%] mx-auto ${cartIsOpen ? "rounded-br-none": ""} rounded-2xl z-30 shadow-2xl`}>
            <div>
                <img src={logo} alt="" className="w-16 rounded-[50%] border-2 border-brand-light"/>
            </div>
            <div className="flex flex-row items-center justify-center gap-8">
                <div className="flex flex-row gap-6 font-body">
                    <motion.div whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}}><Link to="/" className="text-brand-secondary bg-brand-light cursor-pointer p-0.5 w-28 text-center rounded-sm flex items-center justify-center">Hjem</Link></motion.div>
                    <motion.div whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}}><Link to="/Products" className="text-brand-secondary bg-brand-light cursor-pointer p-0.5 w-28 text-center rounded-sm flex items-center justify-center">Produkter</Link></motion.div>
                    <motion.div onClick={()=>setCartIsOpen(!cartIsOpen)} whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}}><button className="text-brand-secondary bg-brand-light cursor-pointer p-0.5 w-28 text-center rounded-sm flex items-center justify-center">Handlekurv</button></motion.div>         
                </div>
                <motion.div whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}} className="bg-brand-primary h-8 w-8 p-1 text-brand-light rounded-sm" >
                    <Link to="https://www.instagram.com/hos.liisa/">
                        <svg fill="currentColor" id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.56 597.5">
                            <path d="M457.5,110c-20,0-35,15-35,35s15,35,35,35,35-15,35-35c0-20-15-35-35-35Z"/>
                            <path d="M300,155c-82.5,0-147.5,67.5-147.5,147.5s67.5,147.5,147.5,147.5,147.5-67.5,147.5-147.5-65-147.5-147.5-147.5ZM300,397.5c-52.5,0-95-42.5-95-95s42.5-95,95-95,95,42.5,95,95-42.5,95-95,95Z"/>
                            <path d="M420,0h-237.5C80,0,0,80,0,180v237.5c0,100,80,180,180,180h237.5c100,0,180-80,180-180v-237.5C600,80,520,0,420,0ZM542.5,420c0,67.5-55,125-125,125h-237.5c-67.5,0-125-55-125-125v-237.5c0-67.5,55-125,125-125h237.5c67.5,0,125,55,125,125v237.5Z"/>
                        </svg>
                    </Link>       
                </motion.div>
            </div>
            
            
        </nav>
    )
}