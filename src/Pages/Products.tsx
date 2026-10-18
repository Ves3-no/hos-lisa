import type { product } from "../types";
import ProductCard from "../Comps/ProductCard"
export default function Main({Products}: {Products: product[] | undefined}){
    return(
        <div>
            <section id="Collection">
                <h1>Produkter</h1>
                    <div>
                        {Products?.map((prod, index)=>(
                            <ProductCard product={prod} index={index} />
                        ))}
                    </div>
            </section>
        </div>
    )
}