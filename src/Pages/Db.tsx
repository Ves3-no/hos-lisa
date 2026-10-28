import { useEffect, useState } from "react"
import type { product, Page, Order, Image, DBPage } from "../types"
import { supabase } from "../supabase"
import Products from "../Comps/DbProducts"
import Orders from "../Comps/Orders"
import Images from "../Comps/DBImages"
import Pages from "../Comps/DBSites"


export default function Main({products, pages}:{products: product[], pages: Page[]}){
    const [orders, setOrders] = useState<Order[]>([])
    const [images, setImages] =useState<Image[]>([])
    const [previewPages, setPreviewPages] = useState<Page[]>([])
    const [previewProducts, setPreviewProducts] = useState<product[]>([])

    const [currentProductInEdit, setCurrentProductInEdit] = useState<string>("")
    const [cureentEditedPage, setCureentEditedPage] = useState<string>("")

    const [page, setPage] = useState<DBPage>("Orders")


    useEffect(()=>{
        if(products){
            setPreviewProducts(products)
        }
        if(pages){
            setPreviewPages(pages)
        }
            async function getImages() {
                const {data, error} = await supabase
                    .from("Images")
                    .select()
                if(error){
                    console.log(error.message)
                    return
                }
              const json: Image[] = data as Image[]
              setImages(json)
            }
            async function getOrders() {
                const {data, error} = await supabase
                    .from("orders")
                    .select()
                if(error){
                    console.log(error.message)
                    return
                }
                const json: Order[] = data as Order[]
              setOrders(json)
            }
            async function checkIfLoggedInn(){
                const { data: { user }, error } = await supabase.auth.getUser()
                if(!user || error){
                    window.location.href = "/auth"
                }
            }
            checkIfLoggedInn()
            getOrders()
            getImages()
    }, [])

    async function sendImage(id: string) {
        
    }
    async function sendOrderStatus(id: string, status: string) {
        
    }
    async function sendOrderTracking(id: string, tracking: string) {
        
    }
    async function sendProduct(id: string) {
        
    }
    async function sendPage(id: string) {
        
    }

    async function changeProductPreview(id: string) {
        
    }
    async function changePagesPreview(id: string) {
        
    }

    return(
        <div className="h-screen overflow-hidden font-body flex flex-row">
            <div className="w-[26%] min-w-70 bg-brand-secondary flex flex-col items-center gap-10 h-full">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-semibold text-white mt-10">HosLisa - DB</h1>
                    <p className="text-brand-primary">Laget av <a href="https://ves3.no/" className="font-semibold hover:underline">Ves3</a></p>
                </div>
                <div className="flex flex-col items-center justify-center gap-10">
                    <button onClick={()=>setPage("Orders")} className="btn-primary ">Bestillinger</button>
                <button onClick={()=>setPage("Products")} className="btn-primary ">Produkter</button>
                <button onClick={()=>setPage("Images")} className="btn-primary ">Bilder</button>
                <button onClick={()=>setPage("Sites")} className="btn-primary ">Sider</button>
                </div>
                
            </div>
            <div className="w-full">
                {
                    page == "Products" ? <Products /> : page == "Orders" ? <Orders sendOrderStatus={sendOrderStatus} orders={orders}/> : page == "Images" ? <Images /> : <Pages />
                }
            </div>
        </div>
    )
}