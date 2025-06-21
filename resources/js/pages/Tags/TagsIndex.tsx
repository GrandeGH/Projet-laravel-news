    import Layout from "@/layouts/DefaultLayout2"
    import { usePage } from "@inertiajs/react"
    import { Link } from "@inertiajs/react"
    
    export default function TagIndex({tags}) {
    
        return(
            <Layout>
                <div className="m-5">
                    <h2 className=" mb-3 text-2xl">Liste des tags</h2>
    
                   <ul className="flex flex-wrap gap-3">
                       {tags.length > 0 ? (
                            tags.map((tag) => (
                                <li key={tag.id} 
                                    className="gap-1 border border-white rounded-2xl flex p-1 px-2 ">
                                    <Link 
                                        href={`/tags/${tag.slug}`}
                                    >
                                        {tag.name}
                                    </Link>
                                    {/* <button className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red-500 size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button> */}
                                </li>
                            ))
                       ) : (
                        <p>Aucun tags</p>
                       )} 
                   </ul>

                </div>
            </Layout>
        )
    }