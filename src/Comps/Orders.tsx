import { useEffect, useState } from "react";
import type { Order, saveTracking } from "../types";
import { motion } from "motion/react"


export default function Main({orders, sendOrderStatus, sendOrderTracking, saveOrderTracking}: {orders: Order[], sendOrderStatus: any, sendOrderTracking: any, saveOrderTracking: any}){
    const [filterOrders, setFilterOrders] = useState<Order[]>([])
    const [trackingNumber, setTrackingNumber ] = useState<saveTracking>()
    const [trackingprovider, setTrackingprovider ] = useState<saveTracking>()

    useEffect(()=>{
        if(orders){
            setFilterOrders(orders)
        }
    }, [orders])

    function sortOrders(value: string){
        if(value == "alle"){
            setFilterOrders(orders)
        } else {
            setFilterOrders(orders.filter(order => order.status == value))
        }
    }
    


    return(
    <div className="p-8">
        <h2 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Bestillinger</h2>
        <div className="flex flex-row items-center mt-4">
            <p>Sorter etter:</p>
            <motion.select onChange={(e)=>sortOrders(e.currentTarget.value)} defaultValue={"alle"} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="bg-brand-secondary text-brand-light cursor-pointer rounded-lg p-1 ml-2">
                <option value="alle">Alle</option>
                <option value="paid">Betalt</option>
                <option value="pending">Venter</option>
                <option value="shipped">Sendt</option>
                <option value="delivered">Levert</option>
            </motion.select>
        </div>
        <div className="flex flex-row flex-wrap py-4 gap-8 overflow-y-scroll h-[88vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filterOrders.map((order, index)=>(
                <div key={index} className="bg-brand-primary rounded-2xl p-4 flex flex-col font-body text-brand-secondary gap-4 shadow-xl">
                    <h2 className="text-2xl text-brand-light font-heading">Ordre fra: <span className="font-bold">{order.customer_name != undefined ? order.customer_name : order.shipping_address.name }</span></h2>
                    <div className="">
                        Status:
                        <motion.select onChange={(e)=>sendOrderStatus(order, e.currentTarget.value)} defaultValue={order.status} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="bg-brand-light cursor-pointer rounded-lg p-1 ml-2">
                            <option value="paid">Betalt</option>
                            <option value="pending">Venter</option>
                            <option value="shipped">Sendt</option>
                            <option value="delivered">Levert</option>
                        </motion.select>
                    </div>
                    <div className="border-brand-light border-2 rounded-2xl p-2">
                        <h2 className="text-brand-light text-xl font-heading font-bold">Info</h2>
                        <p className="">Navn: <span className="font-bold">{order.customer_name != undefined ? order.customer_name : order.shipping_address.name }</span> </p>
                        <p className="">Email: <span className="font-bold">{order.customer_email}</span></p>
                        <p className="">Adresse 1: <span className="font-bold">{order.shipping_address.address.line1}, {order.shipping_address.address.postal_code}, {order.shipping_address.address.city}</span></p>
                        {order.shipping_address.address.line2 != undefined ? <p>Adresse 2 : <span className="font-bold">{order.shipping_address.address.line2}</span></p>: ""}
                    </div>
                    <div className="flex gap-2 flex-col border-brand-light border-2 rounded-2xl p-2">
                        <h2 className="text-brand-light text-xl font-heading font-bold">Sporingsnummer</h2>
                        <input type="text" placeholder="Ingen sporingsnummer" defaultValue={order.tracking_number} onChange={(e)=> setTrackingNumber({tracking: e.currentTarget.value, order: order})}/>
                        <input type="text" placeholder="Selskap(Valgfritt)" defaultValue={order.tracking_provider} onChange={(e)=> setTrackingprovider({tracking: e.currentTarget.value, order: order})}/>
                        <motion.button onClick={()=> sendOrderTracking(order, trackingNumber, trackingprovider)} className="btn-primary text-sm p-2 w-auto" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Send Sporingsnummer</motion.button>
                        <motion.button onClick={()=> saveOrderTracking(order, trackingNumber, trackingprovider)} className="btn-secondary text-sm p-2 w-auto" whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Lagre Sporingsnummer</motion.button>
            
                    </div>
                    <div className="flex gap-2 flex-col border-brand-light border-2 rounded-2xl p-2">
                        <h2 className="text-brand-light text-xl font-heading font-bold">Produkter</h2>

                        {order.items.map((item, index)=>(
                            <div key={index} className="bg-brand-light rounded-2xl p-2">
                                <h3>Navn: <span className="font-bold">{item.description}</span> </h3>
                                <p>Antall: {item.quantity}</p>
                                <p>Pris: {item.amount_total}</p>
                            </div>
                        ))}

                        <p>Total pris: <span className="font-bold">{order.total_amount}kr</span></p>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}
