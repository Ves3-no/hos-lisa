import { motion, AnimatePresence } from "framer-motion"
import type { ProductInCart as TypeProductInCart } from "../types"
import { useEffect, useState } from "react"
import ProductInCart from "./ProductInCart"
import { supabase } from "../supabase"

export default function Main({cartIsOpen, Cart, removeFromCart }: {cartIsOpen: boolean, Cart: TypeProductInCart[], removeFromCart:any}){
    const [total, setTotal] = useState<number>(0)
    const[acceptedTerms, setAcceptedTerms] = useState<boolean>(false)
    useEffect(()=>{
        var totalnow = 0
        Cart.forEach(item => {
            totalnow += item.Product.price
        })
        setTotal(totalnow)
    }, [Cart])
    async function HandleCheckOut() {
        if (acceptedTerms) {
            try {
                const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                    body: { items: Cart },
                })
                if (error) {
                    console.log(error.message)
                }
                if (data?.url) {
                    window.location.href = data.url;
                } 
            } catch (err) {
                console.log(err)
            }
        }
    }
    return(
        <AnimatePresence>
            {cartIsOpen ? <motion.div initial={{ opacity: 1, scaleY: 0, originY: 0 }} animate={{ opacity: 1, scaleY: 1, originY: 0 }} transition={{ duration: 0.2 }} exit={{ opacity: 1, scaleY: 0, originY: 0 }} className="rounded-b-2xl fixed max-w-[90%] right-[5%] xl:right-[20%] top-22.5 z-50 bg-brand-secondary flex flex-col gap-4 p-4 shadow-lg">
                <h2 className="text-2xl font-semibold font-heading text-brand-light">Handlekurv</h2>
                <div className="flex flex-col gap-4 max-h-42 overflow-y-scroll pr-2">
                    {Cart.map((item, index)=>(
                        <ProductInCart key={index} product={item} index={index} removeFromCart={removeFromCart}/>
                    ))}
                </div>
                <p className="font-body text-lg text-brand-light ">Pris: {total}kr</p>
                <div className="flex flex-row gap-2 text-sm text-brand-light/70 p-0.5 -mt-4">
                    <input type="checkbox" checked={acceptedTerms} onChange={(e)=> setAcceptedTerms(e.currentTarget.checked)}/>
                    <p>For å fortsett må du godkjenne våre <a className="underline font-bold" href="/Salgsvilkar">Salgsvilkår</a></p>
                </div>
                <motion.button className="btn-primary " onClick={()=>HandleCheckOut()} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Gå til betaling</motion.button>
            </motion.div> : null}
        </AnimatePresence>
    )
}