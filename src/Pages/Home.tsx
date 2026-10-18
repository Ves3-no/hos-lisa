
import { useEffect } from "react"
import type { product } from "../types"
import ProductCard from "../Comps/ProductCard.tsx"
import { motion, number } from "motion/react"
import { Link } from "react-router-dom"

export default function Main({Products}: {Products: product[] | undefined}){
    
    return(
        <>
            <div id="Header">
                <div className="bg-[url('/photo-1445019980597-93fa8acb246c.avif')] bg-cover bg-center w-full px-32 py-16 h-[76vh]">
                    <div className="bg-brand-primary w-[30%] p-10 rounded-2xl gap-8">
                        <h1 className="text-6xl font-heading text-brand-light text-shadow-2xs text-shadow-brand-light">Hos Lisa</h1>
                        <p className="text-brand-light">- Av Lisa</p>
                        <div className="flex flex-row gap-4 mt-4">
                            <motion.button className="btn-primary" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Våre Produkter</motion.button>
                            <motion.button className="btn-secondary" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Om oss</motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <section id="ImageCarusell">

            </section>
            <section id="Collection" className="my-10">
                <h2 className="text-5xl font-heading text-center font-semibold ">Produkter</h2>
                <div className="flex flex-row gap-10 flex-wrap justify-center mt-10">
                    {Products?.slice(0, 3).map((prod, index)=>(
                        <ProductCard product={prod} index={index} /> 
                    ))}
                </div>
            </section>
            <section id="About">
                <div>
                    <h1>Hos Lisa</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum quis consequatur quae ex ipsum molestias odio tenetur! Corporis quisquam nobis quo quibusdam veniam! Repellat totam ullam exercitationem amet temporibus!</p>
                </div>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="bg-brand-primary h-8 w-8 p-1 text-brand-light rounded-sm" >
                    <Link to="https://www.instagram.com/hos.liisa/">
                        <svg fill="currentColor" id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.56 597.5">
                            <path d="M457.5,110c-20,0-35,15-35,35s15,35,35,35,35-15,35-35c0-20-15-35-35-35Z"/>
                            <path d="M300,155c-82.5,0-147.5,67.5-147.5,147.5s67.5,147.5,147.5,147.5,147.5-67.5,147.5-147.5-65-147.5-147.5-147.5ZM300,397.5c-52.5,0-95-42.5-95-95s42.5-95,95-95,95,42.5,95,95-42.5,95-95,95Z"/>
                            <path d="M420,0h-237.5C80,0,0,80,0,180v237.5c0,100,80,180,180,180h237.5c100,0,180-80,180-180v-237.5C600,80,520,0,420,0ZM542.5,420c0,67.5-55,125-125,125h-237.5c-67.5,0-125-55-125-125v-237.5c0-67.5,55-125,125-125h237.5c67.5,0,125,55,125,125v237.5Z"/>
                        </svg>
                    </Link>       
                </motion.div>
            </section>
        </>
    )
}