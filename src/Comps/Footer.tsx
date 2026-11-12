import { motion } from "motion/react"
import { Link } from "react-router-dom"
export default function Main(){
    return(
        <footer className="p-1 bg-brand-primary font-body sticky bottom-0 mt-10 text-[14px] md:text-[16px]">
            <h2 className="text-brand-secondary italic font-heading text-4xl block md:hidden mx-auto w-40 text-center">HOS LISA</h2>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 lg:px-30 md:pt-10 px-4 pt-4">
                <div className="justify-center hidden md:flex">
                    <div className="">
                        <h2 className="text-brand-secondary italic font-heading text-4xl w-50 mb-8">HOS LISA</h2>
                        <p className="lg:w-85 font-bol border border-brand-secondary text-sm text-brand-secondary p-2 rounded-lg">Tusen takk for all støtte og interesse for Hos Lisa. Det betyr utrolig mye, og jeg gleder meg til å dele mer med dere etter hvert. Dette er bare begynnelsen, og det kommer mer i tiden fremover.</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-[98%] lg:w-auto">
                        <h4 className="text-brand-secondary font-bold font-heading text-2xl w-50">Sider</h4>
                        <div className="flex flex-col gap-2 italic font-body mt-4 underline text-brand-secondary">
                            <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href={"/Salgsvilkar"}>Salgsvilkår</motion.a>
                            <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href={"/AngrerettOgAngreskjema"}>Angrerett og Angreskjema</motion.a>
                            <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href={"/Personvernerklering"}>Personvernerklæring</motion.a>
                            <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href={"/Products"}>Produkter</motion.a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-brand-secondary ">
                    <div className="w-[90%] lg:w-auto">
                        <h4 className="text-brand-secondary font-bold font-heading text-2xl w-50">Info</h4>
                        <div>
                            <p>Telefon: <span className="underline italic font-bold ">+47 936 47 477</span></p>
                            <p>Mail: <motion.a className="underline italic font-bold " whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href="mailto:lisaeriksmoen06@gmail.com">lisaeriksmoen06@gmail.com</motion.a></p>
                            <motion.div whileHover={{y: -3, scale: 1.05}} whileTap={{y: 1.5, scale: 0.98}} transition={{type: "spring", stiffness: 400, damping: 16}} className=" h-8 w-8 text-brand-secondary rounded-sm mt-2">
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
                </div>
            </div>
            <p className="font-body text-center text-brand-dark/40 mt-8">&copy; 2026 Hos Lisa. Alle rettigheter forbeholdt.</p>
        </footer>
        
    )
}