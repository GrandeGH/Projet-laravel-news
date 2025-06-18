import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function ArticleIndex({articles}) {
    const { auth } = usePage().props

    return(
        <Layout>
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-3">List des articles</h1>
                {articles.length === 0 ? (
                    <p>Aucun article disponible</p>
                ) : (
                    articles.map((article) => (
                        <div className="border border-white m-3 p-3">
                            <h2 className="text-2xl font-semibold">{article.title}</h2>
                            <p>Slug : {article.slug}</p>
                            <p>Categorie : {article.categorie?.name}</p>
                            <p><strong>Content</strong> : {article.content}</p>
                            {article.image && (
                                <img 
                                    src={`/storage/${article.image}`} // important : ajoute /storage/ si l'image est stockée dans public/storage
                                    alt={article.title}
                                    className="w-full max-w-md rounded mt-2"
                                />
                            )}

                            <button className="border border-white p-1 cursor-pointer">
                                Voir l'article
                            </button>

                            {/* Fonction role */}
                            {['admin', 'webmaster', 'auteur'].includes(auth.user?.role) ? (
                                
                                <Link className="border border-white p-1 cursor-pointer" href={`/edit/article/${article.id}`}>
                                    <button className="">
                                        Modifier
                                    </button>
                                </Link>
                                
                                ) : (
                                    " "
                                )}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    )
}