import type { Order } from "../types";

export default function Main({orders, sendOrderStatus}: {orders: Order[], sendOrderStatus: any}){
    return(<div>
        <h2 className="text-3xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Bestillinger</h2>
        <div className="flex flex-row flex-wrap p-8 gap-8">
            {orders.map((order, index)=>(
                <div key={index} className="bg-brand-primary rounded-2xl p-4 flex flex-col font-body text-brand-secondary">
                    <h2 className="text-2xl text-brand-light font-heading">Ordre nummer: <span className="font-bold">{order.id}</span></h2>
                    <div className="">
                        Status:
                        <select onChange={(e)=>sendOrderStatus(order.id, e.currentTarget.value)} defaultValue={order.status} className="bg-brand-light rounded-lg p-1 ml-2">
                            <option value="paid">Betalt</option>
                            <option value="pending">Venter</option>
                            <option value="shipped">Sendt</option>
                            <option value="delivered">Levert</option>
                        </select>
                    </div>
                    <div>
                        <h2 className="text-brand-light text-xl font-heading font-bold">Info</h2>
                        <p className="text-brand-light/80">Navn: {order.customer_name != undefined ? order.customer_name : order.shipping_address.name } </p>
                        <p className="text-brand-light/80">Email: {order.customer_email}</p>
                        <p className="text-brand-light/80">Adresse 1: {order.shipping_address.address.line1}, {order.shipping_address.address.postal_code}, {order.shipping_address.address.city}</p>
                        {order.shipping_address.address.line2 != undefined ? <p>Adresse 2 : {order.shipping_address.address.line2}</p>: ""}
                    </div>
                    <div>
                        <h2 >Sporingsnummer</h2>
                        <p>{order.tracking_number}</p>
                        <button>Send Sporingsnummer</button>
                    </div>
                    <div>
                        <h2>Produkter</h2>

                        {order.items.map((item, index)=>(
                            <div key={index}>
                                <h3>Navn: {item.description}</h3>
                                <p>Antall: {item.quantity}</p>
                                <p>Pris: {item.amount_total}</p>
                            </div>
                        ))}

                        <p>Total pris: {order.total_amount}kr</p>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}
