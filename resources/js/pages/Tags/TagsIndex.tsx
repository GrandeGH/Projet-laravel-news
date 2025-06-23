    import Layout from "@/layouts/DefaultLayout2"
    import { usePage } from "@inertiajs/react"
    import { Link } from "@inertiajs/react"
    
    export default function TagIndex({tags}) {
        const { auth } = usePage().props
    
        return(
            <Layout>
                <div className="m-6">
                    <h2 className=" mb-5 text-3xl">Liste des tags</h2>
    
                   <ul className="flex flex-wrap gap-3">
                       {tags.length > 0 ? (
                            tags.map((tag) => (
                                <li key={tag.id} 
                                    className="gap-1 border border-white rounded-3xl flex justify-center p-1 px-2 text-sm">
                                    <Link 
                                        href={`/tags/${tag.slug}`}
                                        className="p-0.5"
                                    >
                                        {tag.name}
                                    </Link>
                                    <div>
                                        {['admin', 'webmaster'].includes(auth.user?.role) ? (
                                        
                                        <Link className="" href={`edit/tag/${tag.id}`}>
                                            <button className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 transition hover:scale-120">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                        </Link>
                                        ) : (
                                            " "
                                        )}
                                    </div>
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