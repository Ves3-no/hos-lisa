export type product = {
    id: string
    created_at: any
    name: string
    description: string
    price: number
    stock: number
    image_url: string
    image_url_1: string | null
    image_url_2: string | null
}
export type Image = {
    id: string
    use: "carousel" | "header"
    url: string
}
export type CartItem ={
    productId: string
    quantity: number
}
export type Page = {
    id: string
    Header: string
    Section_1: string | undefined
    Section_2: string | undefined
    Section_3: string | undefined
    Link: string | undefined
}

export type shipping = {
    name: string | undefined
    address: {
    city: string,
    line1: string,
    line2: string | undefined,
    state: string | undefined,
    country: string,
    postal_code: string
  }
}

export type ItemInOrder = {
    quantity: number,
    description: string,
    amount_total: number
}

export type OrderStatus = "paid" | "pending" | "shipped" | "delivered"

export type Order = {
    id: string
    stripe_checkout_session_id: string
    customer_name: string | undefined
    customer_email : string
    shipping_address: shipping
    items : ItemInOrder[]
    total_amount : number
    status: OrderStatus
    tracking_number : string | undefined
}

export type DBPage = "Orders" | "Products" | "Images" | "Sites"