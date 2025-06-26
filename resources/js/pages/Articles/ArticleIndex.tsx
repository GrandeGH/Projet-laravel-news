import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function ArticleIndex({articles}) {
    const { auth } = usePage().props

    return(
        <Layout>
            {/* créer un article par role */}
                {['admin', 'webmaster', 'auteur'].includes(auth.user?.role) ? (
                    <div className="mt-1 mb-1 max-w-40">
                        <Link href="/create/article" className="text-orange-300 hover:text-white transition cursor-pointer flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>Créer un article</p>
                        </Link>                                           
                    </div>
                ) : (
                    " "
                )}
            <div className=" max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">Nos articles</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {articles.length === 0 ? (
                        <p className="text-center text-gray-300 text-lg">Aucun article disponible</p>
                    ) : (
                        articles.map((article) => (
                            <div className="border border-white sm:m-0 lg:m-3 p-3 flex flex-col justify-between bg-white/20 group">
                                {/* image */}           
                                <div className="aspect-video border border-white overflow-hidden">
                                    {article.image && (
                                        <img 
                                            src={`/storage/${article.image}`} // important : ajoute /storage/ si l'image est stockée dans public/storage
                                            alt={article.title}
                                            className=" w-full object-cover h-50 mb-3 group-hover:scale-110 transition duration-300"
                                        />
                                    )}
                                </div>
                                <Link href={`/detail/article/${article.id}`}>                                 
                                    <h2 className="hover:text-amber-400 text-2xl font-semibold my-2 line-clamp-2" title={article.title}>{article.title}</h2>
                                </Link> 
                                {/* pied de la carte */}
                                <div className="mt-auto flex justify-between items-end pt-1">    
                                    <div className="space-x-2">
                                        <Link href={`/detail/article/${article.id}`}>
                                            <button className="border border-white py-1  px-3 cursor-pointer hover:bg-amber-500">
                                                Voir l'article
                                            </button>
                                        </Link>

                                        {/* Fonction role */}
                                        {['admin', 'webmaster', 'auteur'].includes(auth.user?.role) ? (
                                            
                                            <Link className="" href={`/edit/article/${article.id}`}>
                                                <button className="border border-white py-1 px-3 cursor-pointer hover:bg-amber-500 ">
                                                    Modifier
                                                </button>
                                            </Link>
                                            
                                            ) : (
                                                " "
                                            )}
                                    </div>
                                    {/* Date de création */}
                                    <p className="text-sm text-gray-400 mb-2 me-0.5">
                                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    )
}