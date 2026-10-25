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
import Thanks from "./Pages/Thanks.tsx"
import Auth from "./Pages/Auth.tsx"
import Db from "./Pages/Db.tsx"



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

  function addToCart(product: product){
    setCart([...Cart, product])
    setCartIsOpen(true)
  }
  function removeFromCart(product: product){
    const indexToRemove = Cart.findIndex(item => item.id === product.id);
    setCart([...Cart.slice(0, indexToRemove), ...Cart.slice(indexToRemove + 1)
  ]);
  }
  return (
   <div className='bg-brand-light'>
    <NavComp setCartIsOpen={setCartIsOpen} cartIsOpen={cartIsOpen}/>
    <Routes>
        <Route path='/' element={<Home Products={Products} addToCart={addToCart} images={images}/>}/>
        <Route path='/Product' element={<ProductPage Products={Products} addToCart={addToCart}/>} />
        <Route path='/Products' element={<ProductsPage Products={Products} addToCart={addToCart}/>} />
        <Route path='/success' element={<Thanks/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/Dashboard' element={<Db/>}></Route>
    </Routes>
    <CartComp setCartIsOpen={setCartIsOpen} cartIsOpen={cartIsOpen} Cart={Cart} removeFromCart={removeFromCart}/>
    <FooterComp />
   </div>
  )
}

export default App
