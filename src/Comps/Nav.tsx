import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "/843339068_18117228145909344_2576512124900151496_n.jpg"
export default function Main({setCartIsOpen}: {setCartIsOpen: any}){
    return(
        <nav>
            <div>
                <img src={logo} alt="" />
            </div>
            <div>
                <Link to="/">Hjem</Link>
                <Link to="/">Produkter</Link>
                <Link to="/">Handlekurv</Link>
            </div>
        </nav>
    )
}