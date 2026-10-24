import { useEffect, useState } from 'react'
import type { product, Image } from './types'
import { Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home.tsx"
import CartComp from "./Comps/Cart.tsx"
import NavComp from "./Comps/Nav.tsx"
import ProductPage from "./Pages/Product.tsx"
import FooterComp from "./Comps/Footer.tsx"
import ProductsPage from "./Pages/Products.tsx"
import { supabase } from './supabase.ts'



function App() {
  const [Cart, setCart] = useState<product[]>([])
  const [Products, setProducts] = useState<product[]>([])
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [images, setImages] = useState<Image[]>([])

  useEffect(()=> {
    async function getProducts(){
      const {data, error} = await supabase
        .from("products")
        .select()
      if(error){
        console.log(error.message)
        return
      }
      const json: product[] = data as product[]
      setProducts(json)
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
    getImages()
    getProducts()
  }, [])
  return (
   <div className='bg-brand-light'>
    <NavComp setCartIsOpen={setCartIsOpen}/>
    <Routes>
        <Route path='/' element={<Home Products={Products} images={images}/>}/>
        <Route path='/Product' element={<ProductPage Products={Products}/>} />
        <Route path='/Products' element={<ProductsPage Products={Products}/>} />
    </Routes>
    <CartComp setCartIsOpen={setCartIsOpen} cartIsOpen={cartIsOpen} Cart={Cart}/>
    <FooterComp />
   </div>
  )
}

export default App
