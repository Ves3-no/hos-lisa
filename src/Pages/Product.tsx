import { useSearchParams } from "react-router-dom";
import type { product } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Main({Products}: {Products: product[]}){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  
    const [product, setProduct] = useState<product>()

    useEffect(()=>{
        if(Products[0]){
            const productId = searchParams.get("id");
            const prod = Products?.find((prod) => prod.id == productId )
            if(prod){
                setProduct(prod)
            } else{
                setProduct(undefined)
            }
        }
    }, [Products])
    
    useEffect(()=>{ if(product == undefined && Products[0]) navigate("/")},[product])

    return(
        <div>
            <div>
                <img src={product?.image_url} alt="" />
            </div>
            <div>
                <h1>{product?.name}</h1>
                <p>{product?.price}Kr</p>

                <p>{product?.description}</p>

                <button>Legg i Handlekurv</button>
            </div>
        </div>
    )
}