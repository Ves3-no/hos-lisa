
import { Link } from "react-router-dom"
import ProductCar from "../Comps/ProductCarHomePage"
import type { Image, product } from "../types"
import { motion } from "motion/react"
import ImageCarusel from "../Comps/ImageCarusel"

export default function Main({Products, images, addToCart}: {Products: product[] | undefined, images: Image[] | undefined, addToCart:any}){
    return(
        <>
            <div id="Header">
                <div className="bg-[url('/photo-1445019980597-93fa8acb246c.avif')] bg-cover bg-center w-full px-32 py-36 h-[80vh]">
                    <div className="bg-brand-primary w-[30%] min-w-100 p-10 rounded-2xl gap-8 shadow-xl shadow-brand-dark/50">
                        <h1 className="text-6xl font-semibold font-heading text-brand-light text-shadow-2xs text-shadow-brand-light">Hos Lisa</h1>
                        <p className="text-brand-light">- Av Lisa</p>
                        <div className="flex flex-row gap-4 mt-4">
                            <motion.a href="/Products" className="btn-primary text-center" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Våre Produkter</motion.a>
                            <motion.a href="#About" className="btn-secondary text-center" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Om oss</motion.a>
                        </div>
                    </div>
                </div>
            </div>
            <section id="ImageCarusell">
                <ImageCarusel images={images}/>
            </section>
            <section id="Collection" className="my-10">
                <h2 className="text-5xl font-heading text-center font-semibold text-brand-secondary">Produkter</h2>
                <ProductCar products={Products} addToCart={addToCart} />
            </section>
            <section id="About" className="h-auto p-8 bg-brand-primary flex flex-row items-center justify-center ">
                <div className="w-152 bg-brand-light p-8 rounded-l-2xl ">
                    <h1 className="font-semibold font-heading text-3xl mb-px text-brand-secondary">Hos Lisa</h1>
                    <p className="font-body text-brand-dark mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum quis consequatur quae ex ipsum molestias odio tenetur! Corporis quisquam nobis quo quibusdam veniam! Repellat totam ullam exercitationem amet temporibus! Ta kontakt på <span className="font-semibold">+47 123 45 678</span> om du lurer på noe</p>
                    <div className="flex flex-row gap-4 items-center font-body mt-4">
                        <motion.a whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}} className="btn-primary text-center p-1 bg-brand-primary text-brand-light border-brand-primary ">Produkter</motion.a>
                        <motion.div whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}} className=" h-8 w-8 text-brand-primary rounded-sm">
                            <Link to="https://www.instagram.com/hos.liisa/">
                                <svg fill="currentColor" id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.56 597.5">
                                    <path d="M457.5,110c-20,0-35,15-35,35s15,35,35,35,35-15,35-35c0-20-15-35-35-35Z"/>
                                    <path d="M300,155c-82.5,0-147.5,67.5-147.5,147.5s67.5,147.5,147.5,147.5,147.5-67.5,147.5-147.5-65-147.5-147.5-147.5ZM300,397.5c-52.5,0-95-42.5-95-95s42.5-95,95-95,95,42.5,95,95-42.5,95-95,95Z"/>
                                    <path d="M420,0h-237.5C80,0,0,80,0,180v237.5c0,100,80,180,180,180h237.5c100,0,180-80,180-180v-237.5C600,80,520,0,420,0ZM542.5,420c0,67.5-55,125-125,125h-237.5c-67.5,0-125-55-125-125v-237.5c0-67.5,55-125,125-125h237.5c67.5,0,125,55,125,125v237.5Z"/>
                                </svg>
                            </Link>       
                        </motion.div>
                    </div>
                </div>
                <div>
                   <img className="w-96 aspect-3/4 object-cover object-bottom-left rounded-2xl" src="https://sdwtyehzxvwgldfgzsjh.supabase.co/storage/v1/object/public/Veske_Bilder/IMG_2274.JPG" alt="" />
                </div>
            </section>
        </>
    )
}