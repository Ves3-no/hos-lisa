import { useState } from "react"
import type { product } from "../types"
import ProductCard from "./DbProductCard"
import { AnimatePresence, motion } from "motion/react"
import { supabase } from "../supabase"


export default function Main({products, showAlert, setProducts}: {products: product[], showAlert: any, setProducts:any}){
    const newEmptyProduct = {
        id: "",
        created_at: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image_url: "https://img.magnific.com/free-photo/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-101806.jpg?semt=ais_hybrid&w=740&q=80",
        image_url_1: null,
        image_url_2: null,
    }

    const [showSavingPopUp, setShowSavingPopUp] = useState<boolean>(false)

    const [currentProductInEdit, setCurrentProductInEdit] = useState<product>(products[0])
    const [currentProductInEditOriginal, setCurrentProductInEditOriginal] = useState<product>(products[0])

    async function Save() {
        if(currentProductInEdit.id == newEmptyProduct.id){
            await CreateNewProduct()
        } else{
            await SaveProduct()
        }
    }
    async function CreateNewProduct() {
        const { data, error } = await supabase
            .from('products')
            .insert({ name: currentProductInEdit.name, description: currentProductInEdit.description, price: currentProductInEdit.price, stock: currentProductInEdit.stock, image_url: ""})
            .select()
            .single();
        if(error){
            showAlert(error.message)
        } else{
            showAlert(`La til produktet ${data.name}`)
            setProducts([...products, data])
        }
    }
    async function SaveProduct() {
        const { data, error } = await supabase
            .from('products')
            .update({ name: currentProductInEdit.name, description: currentProductInEdit.description, price: currentProductInEdit.price, stock: currentProductInEdit.stock})
            .eq(`id`, currentProductInEdit.id)
            .select()
            .single();
        if(error){
            showAlert(error.message)
        } else{
            showAlert(`Redigerte produktet ${data.name}`)
            setProducts(products.map(product => 
                product.id === data.id ? data : product
            ))
        }
    }
    async function DeleateProduct(product: product){
        const response = await supabase
            .from('products')
            .delete()
            .eq('id', product.id)
        if(response.error){
            showAlert(response.error?.message)
        } else{
            showAlert(`Slettet produktet ${product.name}`)
            setProducts(products.filter(p => p.id !== product.id));
        }
    }
    function changeProductInEdit(product: product){
        if(currentProductInEdit == currentProductInEditOriginal){
            setCurrentProductInEdit(product)
            setCurrentProductInEditOriginal(product)
        } else{
            setShowSavingPopUp(true)
            setCurrentProductInEditOriginal(product)
        }
    }
    function changeProductInEditCancel(product: product){
        setShowSavingPopUp(false)
        setCurrentProductInEdit(product)
        setCurrentProductInEditOriginal(product)
    }
    async function changeProductInEditSave(product: product){
        setShowSavingPopUp(false)
        await SaveProduct()
        setCurrentProductInEdit(product)
        setCurrentProductInEditOriginal(product)
    }
    async function addProductImage(product: product, index: number, image: File  ){
        const path = `Vesker/${product.id}_Image_${index+1}.png`
        const { error } = await supabase
            .storage
            .from('Veske_Bilder')
            .upload(path, image, {
                cacheControl: '3600',
                upsert: true
            })
        if(error?.message){
            showAlert("feil melding fra opplastning av bildet til storage: " + error.message)
            return
        }
        const { data: urlData } = supabase
            .storage
            .from('Veske_Bilder')
            .getPublicUrl(path)
        if(urlData){
            const freshUrl = `${urlData.publicUrl}?t=${Date.now()}`;
            const { data, error: productError } = await supabase
                .from('products')
                .update({[index === 0 ? 'image_url' : index === 1 ? 'image_url_1' : 'image_url_2']:  freshUrl})
                .eq(`id`, product.id)
                .select()
                .single();
            if(productError){
                showAlert("Feilmelding fra opplasting av url: " + productError.message)
            } else{
                showAlert(`La til bildet i produktet ${data.name}`)
                setProducts(products.map(product =>
                    product.id === data.id ? data : product
                ))
                await changeProductInEditSave(data)
            }
        }
    }

    return(<>
        <AnimatePresence>
            {showSavingPopUp && (
                <motion.div
                initial={{ opacity: 0, y: -50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -50, x: "-50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-5 left-1/2 z-50 p-6 rounded-2xl bg-brand-secondary text-lg text-brand-light font-heading shadow-lg h-40"
                >
                <h3 className="font-semibold font-heading text-2xl text-center mb-4">Husk å lagre</h3>
                <div className="flex flex-row gap-4">
                    <motion.button className="btn-secondary" onClick={()=>changeProductInEditCancel(currentProductInEditOriginal)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Avbryt</motion.button>
                    <motion.button className="btn-primary" onClick={()=>changeProductInEditSave(currentProductInEditOriginal)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Lagre</motion.button>
                </div>
                </motion.div>
            )}
        </AnimatePresence>
        <div className="flex flex-row overflow-hidden">
            <div className="w-[34%] min-w-85 max-w-100 p-4 flex flex-col gap-4 border-r-2 h-screen border-brand-secondary">
                <h1 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Produkter</h1>
                {products.map((product, index)=>(
                    <motion.div key={index} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-primary rounded-xl px-6 w-full cursor-pointer" onClick={()=>{changeProductInEdit(product)}}>
                        <img alt={""} src={product.image_url} className="w-12 object-cover object-[center_60%] aspect-square rounded-md" />
                        <h3 className="text-lg font-semibold text-brand-secondary font-heading">{product.name}</h3>
                        <p className="font-body text-brand-secondary/60">{product.price}kr</p>
                        <motion.button onClick={()=>DeleateProduct(product)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className= "cursor-pointer text-brand-secondary"><svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></motion.button>
                    </motion.div>
                ))}
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-primary rounded-xl px-6 w-full cursor-pointer" onClick={()=>changeProductInEdit(newEmptyProduct)}>
                        <h2 className="text-lg font-semibold text-brand-secondary font-heading text-center w-full">Nytt Produkt +</h2>
                </motion.div>
                <span className="w-[90%] h-0.5 bg-brand-secondary mx-auto rounded-4xl"></span>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-secondary rounded-xl px-6 w-full cursor-pointer" onClick={()=>Save()}>
                        <h2 className="text-lg font-semibold text-brand-light font-heading text-center w-full">Lagre</h2>
                </motion.div>
            </div>
            <div className="w-full flex items-center flex-col p-4 gap-4 ">
                <h2 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Redigering</h2>
                <div className="rounded-2xl p-4 h-full overflow-hidden">
                    <ProductCard addProductImage={addProductImage} product={currentProductInEdit} setCurrentProductInEdit={setCurrentProductInEdit}/>
                </div>
            </div>
        </div>
    </>)
}