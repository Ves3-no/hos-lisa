import { useEffect, useState } from "react"
import type { product, Page, Order, Image, DBPage, saveTracking } from "../types"
import { supabase } from "../supabase"
import Products from "../Comps/DbProducts"
import { AnimatePresence, motion } from "motion/react"
import Orders from "../Comps/Orders"
import Images from "../Comps/DBImages"
import Pages from "../Comps/DBSites"



export default function Main({products, pages, setProducts}:{products: product[], pages: Page[], setProducts: any}){
    const [orders, setOrders] = useState<Order[]>([])
    const [images, setImages] =useState<Image[]>([])
    const [previewPages, setPreviewPages] = useState<Page[]>([])
    const [alert, setAlert] = useState<string | undefined>(undefined)

    const [cureentEditedPage, setCureentEditedPage] = useState<string>("")

    const [page, setPage] = useState<DBPage>("Orders")


    useEffect(()=>{
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

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async function showAlert(value: string){
        setAlert(value)

        await sleep(2500)

        setAlert(undefined)
    }
    
    async function sendImage(id: string) {
        
    }
    async function sendOrderStatus(order: Order, status: string) {
        const { error } = await supabase
            .from('orders')
            .update({ 
                status: status 
            })
            .eq('id', order.id);
        if(error){
            showAlert(error.message)
        } else{
            showAlert(`Opptatter status for ${order.shipping_address.name} sin bestilling`)
        }
    }
    async function sendOrderTracking(order: Order, tracking: saveTracking, trackingprovider: saveTracking) {
        var number
        var provider
        if(order.tracking_number){
            number = order.tracking_number
        } else if(order.id == tracking.order.id){
            number = tracking.tracking
        }
        if(order.tracking_provider){
            provider = order.tracking_provider
        } else if(order.id == trackingprovider.order.id){
            provider = trackingprovider.tracking
        }
        if(number){
            const { error } = await supabase.functions.invoke('send-shipping-email', {
                body: {
                    orderId: order.id,           
                    trackingNumber: number,  
                    trackingProvider: provider       
                }
            })
            if(error){
                showAlert(error.message)
            } else{
                showAlert(`Sporing sendt til ${order.customer_email}`)
            }
        }
        
    }
    async function saveOrderTracking(order: Order, tracking: saveTracking, trackingprovider: saveTracking) {
        if(order.id == tracking.order.id && (trackingprovider.order.id == order.id || trackingprovider.tracking == undefined || null)){
            const { error } = await supabase
                .from('orders')
                .update({ 
                    tracking_provider: trackingprovider.tracking, 
                    tracking_number: tracking.tracking 
                })
                .eq('id', order.id);
            if(error){
                showAlert(error.message)
            } else{
                showAlert(`Sporing for ${order.shipping_address.name} er lagret`)
            }
        }
    }
    async function sendPage(id: string) {
        
    }
    async function changePagesPreview(id: string) {
        
    }

    return(
        <>
        <AnimatePresence>
            {alert !== undefined && (
                <motion.p
                initial={{ opacity: 0, y: -50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -50, x: "-50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-6 left-1/2 z-50 p-6 rounded-2xl bg-brand-secondary text-lg text-brand-light font-heading shadow-lg"
                >
                {alert}
                </motion.p>
            )}
        </AnimatePresence>
        <div className="h-screen overflow-hidden font-body flex flex-row">
            <div className="w-[26%] min-w-70 bg-brand-secondary flex flex-col items-center gap-10 h-full">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-semibold text-white mt-10">HosLisa - DB</h1>
                    <p className="text-brand-primary">Laget av <a href="https://ves3.no/" className="font-semibold hover:underline">Ves3</a></p>
                </div>
                <div className="flex flex-col items-center justify-center gap-10">
                <motion.button onClick={()=>setPage("Orders")} className="btn-primary " whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Bestillinger</motion.button>
                <motion.button onClick={()=>setPage("Products")} className="btn-primary " whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Produkter</motion.button>
                <motion.button onClick={()=>setPage("Images")} className="btn-primary " whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Bilder</motion.button>
                <motion.button onClick={()=>setPage("Sites")} className="btn-primary " whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Sider</motion.button>
                </div>
                
            </div>
            <div className="w-full">
                {
                    page == "Products" ? <Products setProducts={setProducts} showAlert={showAlert} products={products} /> : page == "Orders" ? <Orders saveOrderTracking={saveOrderTracking} sendOrderStatus={sendOrderStatus} sendOrderTracking={sendOrderTracking} orders={orders}/> : page == "Images" ? <Images /> : <Pages />
                }
            </div>
        </div>
        </>
    )
}