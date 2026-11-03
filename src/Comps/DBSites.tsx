import type { Page } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import PageInPrev from "./DBPageInEdit"
import { useState } from "react";
import { supabase } from "../supabase";

export default function Main({previewPages, setPreviewPages, showAlert}: {previewPages: Page[], setPreviewPages: any, showAlert: any}){
    if(previewPages.length <= 0){
        return
    }

    const [currentPageInEdit, setCurrentPageInEdit] = useState<Page>(previewPages[0])
    const [currentPageInEditOriginal, setCurrentPageInEditOriginal] = useState<Page>(previewPages[0])
    const [showSavingPopUp, setShowSavingPopUp] = useState<boolean>(false)

    function changePageInEdit(page: Page){
        if(currentPageInEdit == currentPageInEditOriginal){
            setCurrentPageInEdit(page)
            setCurrentPageInEditOriginal(page)
        } else{
            setShowSavingPopUp(true)
            setCurrentPageInEditOriginal(page)
        }
    }
    function changeProductInEditCancel(page: Page){
        setShowSavingPopUp(false)
        setCurrentPageInEdit(page)
        setCurrentPageInEditOriginal(page)
    }
    async function changeProductInEditSave(page: Page){
        setShowSavingPopUp(false)
        await Save()
        setCurrentPageInEdit(page)
        setCurrentPageInEditOriginal(page)
    }
    async function Save(){
        const { data, error } = await supabase
            .from('pages')
            .update({ Section_1: currentPageInEdit.Section_1, Section_2: currentPageInEdit.Section_2, Section_3: currentPageInEdit.Section_3, Link: currentPageInEdit.Link, Link_Name: currentPageInEdit.Link_Name })
            .eq(`id`, currentPageInEdit.id)
            .select()
            .single();
        if(error){
            showAlert(error.message)
        } else{
            showAlert(`Lagret siden ${data.Header}`)
            setPreviewPages(previewPages.map(page => 
                page.id === data.id ? data : page
            ))
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
                    <motion.button className="btn-secondary" onClick={()=>changeProductInEditCancel(currentPageInEditOriginal)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Avbryt</motion.button>
                    <motion.button className="btn-primary" onClick={()=>changeProductInEditSave(currentPageInEditOriginal)} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Lagre</motion.button>
                </div>
                </motion.div>
            )}
        </AnimatePresence>
        <div className="flex flex-row overflow-hidden">
            <div className="w-[34%] min-w-85 max-w-100 p-4 flex flex-col gap-4 border-r-2 h-screen border-brand-secondary">
                <h1 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Sider</h1>
                {previewPages.map((page, index)=>(
                    <motion.div key={index} whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-primary rounded-xl px-6 w-full cursor-pointer" onClick={()=>{changePageInEdit(page)}}>
                        <h2>{page.Header}</h2>
                    </motion.div>
                ))}
                <span className="w-[90%] h-0.5 bg-brand-secondary mx-auto rounded-4xl"></span>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="flex flex-row gap-2 items-center p-3 bg-brand-secondary rounded-xl px-6 w-full cursor-pointer" onClick={()=>Save()}>
                        <h2 className="text-lg font-semibold text-brand-light font-heading text-center w-full">Lagre</h2>
                </motion.div>
            </div>
            <div className="w-full flex items-center flex-col p-4 gap-4 "> 
                <h2 className="text-4xl font-heading text-start font-semibold tracking-wide text-brand-secondary">Redigering</h2>
                <div className="rounded-2xl p-4 h-full overflow-hidden w-full">
                    <PageInPrev page={currentPageInEdit} setPage={setCurrentPageInEdit}/>
                </div>
            </div>
        </div>
    </>)
}