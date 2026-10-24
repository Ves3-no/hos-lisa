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