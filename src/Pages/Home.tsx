
import { useEffect } from "react"
import type { product } from "../types"
import ProductCard from "../Comps/ProductCard.tsx"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

export default function Main({Products}: {Products: product[] | undefined}){
    
    return(
        <>
            <div id="Header">
                <div className="bg-[url('/photo-1445019980597-93fa8acb246c.avif')] bg-cover bg-center w-full h-200">

                </div>
            </div>
            <section id="ImageCarusell">

            </section>
            <section id="Collection">
                <h1></h1>
                <div>
                    {Products?.map((prod, index)=>(
                        <ProductCard product={prod} index={index} />
                    ))}
                </div>
            </section>
            <section id="About">
                <div>
                    <h1>Hos Lisa</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum quis consequatur quae ex ipsum molestias odio tenetur! Corporis quisquam nobis quo quibusdam veniam! Repellat totam ullam exercitationem amet temporibus!</p>
                </div>
                <div>
                    <Link to="/"></Link>
                </div>
            </section>
        </>
    )
}