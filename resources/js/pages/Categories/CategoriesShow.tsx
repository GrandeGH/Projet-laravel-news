import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function CategorieShow({categorie, articles}) {
    const { auth } = usePage().props

    return(
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">
                <h2 className="text-2xl mb-5">Catégorie {categorie.name} </h2>
                
                    {categorie.articles.length === 0 ? (
                        <p className="text-center text-gray-300 text-lg">Aucun article disponible</p>
                    ) : (
                        <div className="flex flex-wrap grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {categorie.articles.map((article) => (
                                <div className="border border-white sm:m-0 lg:m-3 p-3 bg-white/20 group">
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
                                    <div className="mt-auto flex justify-between items-end pt-1">
                                        <div>
                                        <Link href={`/detail/article/${article.id}`}>
                                                <button className="border border-white py-1  px-3 cursor-pointer hover:bg-amber-500">
                                                    Voir l'article
                                                </button>
                                        </Link>
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
                            ))}
                        </div>
                    )}  
                
            </div>
        </Layout>
    )
}