import { useEffect } from "react"

export default function Main(){
    useEffect(()=>{
        localStorage.removeItem("Cart")
    }, [])
    return(
        <div className="flex justify-center flex-col w-full h-[96vh] items-center font-body gap-2 text-brand-dark">
            <h1 className="text-5xl font-heading text-brand-secondary font-semibold">Takk for din bestilling!</h1>
            <p>Du vil få ordrebekreftelse og sporingsnummer på mail</p>
            <p>Ta kontakt på <span className="font-semibold">info@hoslisa.com</span> om du lurer på noe</p>
        </div>
    )
}