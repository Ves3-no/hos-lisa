import type {Image} from "../types.ts"
import ImageComp from "./DBImage.tsx"
export default function Main({images, setImages}: {images: Image[], setImages: any}){
    setImages(images)
    return(<>
        <div className="flex flex-row gap-2">
        {images.map((image, index)=>(
            <div key={index}><ImageComp image={image}/></div>
        ))}
        </div>
    </>)
}