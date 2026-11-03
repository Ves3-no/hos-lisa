import type { Page } from "../types";

export default function Main({page, setPage}: {page: Page, setPage: any}){
    if(!page){
        return null
    }
    return(
    <div className="h-[90vh] overflow-y-scroll scrollbar-none pb-6 font-body">
        <h2 className="text-5xl md:text-4xl font-heading text-start font-semibold text-brand-secondary w-120 mb-4">{page.Header}</h2>
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full ">
                <p className="font-semibold text-lg  text-brand-secondary">Seksjon 1</p>
                <textarea onChange={(e)=> setPage((prevPage: Page) => ({...prevPage, Section_1: e.target.value}))} name="" id="" placeholder="Skriv noe her" className="w-full h-50 border rounded-2xl p-2 border-brand-secondary" value={page.Section_1 ?? ""}></textarea>
            </div>
            <div className="w-full ">
                <p className="font-semibold text-lg  text-brand-secondary">Seksjon 2</p>
                <textarea onChange={(e)=> setPage((prevPage: Page) => ({...prevPage, Section_2: e.target.value}))} name="" id="" placeholder="Skriv noe her eller la stå tom" className="w-full h-50 border rounded-2xl p-2 border-brand-secondary" value={page.Section_2 ?? ""}></textarea>
            </div>
            <div className="w-full ">
                <p className="font-semibold text-lg  text-brand-secondary">Seksjon 3</p>
                <textarea onChange={(e)=> setPage((prevPage: Page) => ({...prevPage, Section_3: e.target.value}))} name="" id="" placeholder="Skriv noe her eller la stå tom" className="w-full h-50 border rounded-2xl p-2 border-brand-secondary" value={page.Section_3 ?? ""}></textarea>
            </div>
        </div>

        <div>
            <p className="font-semibold text-lg  text-brand-secondary">Lenke:</p>
            <input onChange={(e)=> setPage((prevPage: Page) => ({...prevPage, Link: e.target.value}))} type="text" placeholder="Legg til en lenke om brukeren skal ha det" className="w-full" value={page.Link ?? ""}/>
            <p className="font-semibold text-lg  text-brand-secondary">Navn på lenken:</p>
            <input onChange={(e)=> setPage((prevPage: Page) => ({...prevPage, Link_Name: e.target.value}))} type="text" placeholder="Skriv inn det brukeren skal lese lenken som" className="w-full" value={page.Link_Name ?? ""}/>
        </div>
    </div>
    )
}