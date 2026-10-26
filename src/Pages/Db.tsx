import { use, useState } from "react"

export default function Main(){
    const [orders, setOrders] = useState<[]>([])
    const [images, setImages] =useState<[]>([])
    const [pages, setPages] = useState<[]>([])
    const [previewProducts, setPreviewProducts] = useState<[]>([])
    return(
        <div>
            <div>
                <button>Bestillinger</button>
                <button>Produkter</button>
                <button>Bilder</button>
                <button>Sider</button>
            </div>
            <div></div>
        </div>
    )
}