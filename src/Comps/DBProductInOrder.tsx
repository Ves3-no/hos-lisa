import type {  ItemInOrder } from "../types";


export default function Main({product, index} : {product: ItemInOrder, index:number}){
    return(
        <div key={index} className="flex flex-row gap-2 items-center p-3 bg-brand-light rounded-xl px-6 w-full">
            <img src={product.Product.image_url ?? ""} className="w-14 h-auto object-cover object-[center_60%] aspect-square rounded-md" />
            <div className="flex flex-col justify-center items-start">
                <div className="flex items-baseline justify-between gap-2 -mb-1">
                    <h3 className="m-0 text-lg font-semibold text-brand-secondary font-heading">{product.Product.name}</h3>
                    <p className="font-body text-brand-secondary/60 ">{product.engraved_name ? product.Product.price + 49 : product.Product.price }kr</p>
                </div>
                {product.with_engraved_name == true ? <p className="text-xs text-brand-secondary/80">Med ingravert navn, "{product.engraved_name}"</p> : <></>}
                <p className="font-body text-brand-secondary text-sm">Antall: <span className="font-bold">{product.quantity}</span></p>
            </div>
        </div>
    )
}