export type product = {
    id: string
    created_at: any
    name: string
    description: string
    price: number
    stock: number
    image_url: string
}
export type Image = {
    id: string
    use: "carousel" | "header"
}