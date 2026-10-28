import { useEffect, useState } from 'react'
import type { product, Image, Page } from './types'
import { Routes, Route, useLocation} from 'react-router-dom'
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
import NotFound from "./Pages/SiteNotFound.tsx"



function App() {
  const [Cart, setCart] = useState<product[]>([])
  const [Products, setProducts] = useState<product[]>([])
  const [Pages, setPages] = useState<Page[]>([])
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [images, setImages] = useState<Image[]>([])
  const [dontShowNav, setDontShowNav] = useState<boolean>(false)
  const [dontShowFooter, setDontShowFooter] = useState<boolean>(false)
  const location = useLocation();

  useEffect(()=> {
    async function getProducts(){
      const {data, error} = await supabase
        .from("pages")
        .select()
      if(error){
        console.log(error.message)
        return
      }
      const json: Page[] = data as Page[]
      setPages(json)
    }
    async function getPages(){
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
        .eq("use", "carousel");
      if(error){
        console.log(error.message)
        return
      }
      const json: Image[] = data as Image[]
      setImages(json)
    }
    function GetCart(){
      let string = localStorage.getItem("Cart")
      if(!string) return
      let cart =JSON.parse(string) as product[]
      setCart(cart)
    }

    if(location.pathname.toLocaleLowerCase() != "/product" && location.pathname != "/" && location.pathname != "/products"){
      setDontShowFooter(true)
    } else{
      setDontShowFooter(false)
    }
    if(location.pathname.toLocaleLowerCase() == "/dashboard" || location.pathname == "/auth"){
      setDontShowNav(true)
    } else{
      setDontShowNav(false)
    }

    getImages()
    GetCart()
    getPages()
    getProducts()
  }, [])

  function addToCart(product: product, count: number){
    if(product.stock >= count){
      var newcart: product[] = Cart
      for(let i = 0; i < count; i++){
        newcart = [...newcart, product]
      }
      setCart(newcart)
      setCartIsOpen(true)
      localStorage.setItem("Cart", JSON.stringify(newcart))
    }
  }
  function removeFromCart(product: product){
    const indexToRemove = Cart.findIndex(item => item.id === product.id);
    setCart([...Cart.slice(0, indexToRemove), ...Cart.slice(indexToRemove + 1)
  ]);
  }
  return (
   <div className='bg-brand-light w-full overflow-x-hidden scrollbar-none'>
    {dontShowNav == false ? <NavComp setCartIsOpen={setCartIsOpen} cartIsOpen={cartIsOpen} />: <></>}
    <Routes>
        <Route path='/' element={<Home Products={Products} addToCart={addToCart} images={images}/>}/>
        <Route path='/Product' element={<ProductPage Products={Products} addToCart={addToCart}/>} />
        <Route path='/Products' element={<ProductsPage Products={Products} addToCart={addToCart}/>} />
        <Route path='/success' element={<Thanks/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/Dashboard' element={<Db pages={Pages} products={Products}/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    <CartComp cartIsOpen={cartIsOpen} Cart={Cart} removeFromCart={removeFromCart}/>
    {dontShowFooter == false ? <FooterComp /> : <></>}
   </div>
  )
}

export default App
