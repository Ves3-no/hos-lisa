import type { product } from "../types";
import ProductCard from "../Comps/ProductCard"
export default function Main({Products}: {Products: product[] | undefined}){
    return(
        <div>
            <section id="Collection">
                <h1 className="text-6xl font-heading text-center font-semibold ">Produkter</h1>
                    <div className="flex flex-row flex-wrap gap-8 justify-center p-10">
                        {Products?.map((prod, index)=>(
                            <ProductCard product={prod} index={index} />
                        ))}
                    </div>
            </section>
        </div>
    )
}