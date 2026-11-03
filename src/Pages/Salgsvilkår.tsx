import type { Page } from "../types";

export default function Main({page}: {page: Page | undefined}){
    if(!page){
        return
    }
    return(
    <>
        <div className="mt-30 h-full flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl font-heading text-center font-semibold tracking-wide text-brand-secondary mb-2">{page.Header}</h1>
            <div className="text-brand-dark bg-brand-primary w-[50%] rounded-2xl p-4" dangerouslySetInnerHTML={{ __html: page.Section_1 ?? <></> }} />
            {page.Section_2 ? <div className="text-brand-dark bg-brand-primary w-[50%] rounded-2xl p-4" dangerouslySetInnerHTML={{ __html: page.Section_2 ?? <></> }} /> : <></>}
            {page.Section_3 ? <div className="text-brand-dark bg-brand-primary w-[50%] rounded-2xl p-4" dangerouslySetInnerHTML={{ __html: page.Section_3 ?? <></> }} /> : <></>}
            {page.Link ? <a className="btn-primary bg-brand-secondary w-auto text-brand-light" href={page.Link}>{page.Link_Name ?? page.Link}</a> : <></>}
        </div>
    </>
    )
}