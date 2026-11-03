import type {Image} from "../types.ts"
import ImageComp from "./DBImage.tsx"
import { motion } from "motion/react"
import { supabase } from "../supabase.ts"
export default function Main({images, setImages, showAlert}: {images: Image[], setImages: any, showAlert: any}){
    
    async function DeleateImage(image: Image){
        const path = `Nettsiden/${image.name}.png`
        const { error } = await supabase
            .storage
            .from('Veske_Bilder')
            .remove([path])
        if (error?.message) {
            showAlert(error.message)
            return
        }
        const {error: error2} = await supabase
            .from('Images')
            .delete()
            .eq('id', image.id)
        if (error2?.message) {
            showAlert(error2.message)
            return
        }
        setImages(images.filter(img => img.id !== image.id));
        showAlert(`Slettet bildet ${image.name}`)
    }
    const convertToWebP = (file: File) => new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = (img.height * 1200) / img.width;
            canvas?.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.8);
        }
    })
    async function AddImage(image: File){
        const cleanName = image.name.replace(/\.[^/.]+$/, "")
        const path = `Nettsiden/${cleanName}.webp`
        const webpBlob = await convertToWebP(image)
        const {error} = await supabase
            .storage
            .from('Veske_Bilder')
            .upload(path, webpBlob, {
                cacheControl: '3600',
                upsert: true,
                contentType: 'image/webp'
            })
        if (error?.message) {
            showAlert("feil melding fra opplastning av bildet til storage: " + error.message)
            return
        }
        const {data: urlData} = supabase
            .storage
            .from('Veske_Bilder')
            .getPublicUrl(path)
        if (urlData) {
            const {data, error: imageError} = await supabase
                .from('Images')
                .insert({use : "carousel", url: urlData.publicUrl, name: image.name})
                .select()
                .single();
            if (imageError) {
                showAlert("Feilmelding fra opplasting av url: " + imageError.message)
            } else {
                showAlert(`La til bildet ${image.name}`)
                setImages([...images, data])
            }
        }
    }
    async function ChanegImage(id: string, use: string){
        const { error } = await supabase
            .from('Images')
            .update({ use: use })
            .eq('id', id)
        if (error) {
                showAlert(error.message)
        } else{
            showAlert("Endret bruk for bildet")
        }
    }

    return(<>
        <div className="overflow-y-scroll screen gap-2 scrollbar-none p-8 font-body">
            <h2 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Bilder</h2>
            <div className="flex flex-row items-center">
                <p>Sorter etter:</p>
                <motion.select  whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="bg-brand-secondary text-brand-light cursor-pointer rounded-lg p-1 ml-2">
                    <option value={"all"}>Alle</option>
                    <option value={"carousel"}>Karusell</option>
                    <option value={"header"}>Header</option>
                </motion.select>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-10 items-center overflow-y-scroll h-fit max-h-[80vh] scrollbar-none">
                {images.map((image, index)=>(
                    <div key={index}><ImageComp image={image} DeleateImage={DeleateImage} ChanegImage={ChanegImage}/></div>
                ))}
                <div className="h-50 flex flex-row gap-4 p-2 border border-brand-secondary w-auto rounded-lg overflow-hidden items-center">
                    <motion.div className="relative w-full h-full  inline-block text-brand-secondary px-2"  whileHover={{scale: 1.075}} transition={{type: "spring", stiffness: 200, damping: 20}}>
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" onChange={(e)=>{ if(e.target.files?.[0]) {AddImage(e.target.files?.[0])}}}/>
                        <div  className=" cursor-pointer h-full w-full flex justify-center items-center font-heading text-xl"><p>Trykk for å laste opp bilde</p></div>
                    </motion.div>
                </div>
            </div>
            <p className="mx-auto w-120 text-center text-sm text-black/60 mt-2">PS: Du må ha minst 6 bilder i karusellen for at den skal fungere!</p>
        </div>
    </>)
}