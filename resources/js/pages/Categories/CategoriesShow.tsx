import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function CategorieShow({categorie, articles}) {

    return(
        <Layout>
            <div>
                <h2 className="text-2xl m-3">Catégorie {categorie.name} </h2>

                        {categorie.articles.length === 0 ? (
                            <p>Aucun article disponible</p>
                        ) : (
                            <p></p>
                        )}
                        <div className="flex flex-wrap">
                            {categorie.articles.map((article) => (
                                <div className="border border-white sm:m-0 lg:m-3 p-3">
                                    <h2 className="text-2xl">{article.title}</h2>

                                    <div>
                                        {article.image && (
                                            <img 
                                                src={`/storage/${article.image}`} // important : ajoute /storage/ si l'image est stockée dans public/storage
                                                alt={article.title}
                                                className="w-full max-w-md rounded mt-2 object-cover max-h-50 mb-3"
                                            />
                                        )}
                                    </div>

                                    <Link href="">Lien vers l'article</Link>
                                </div>
                            ))}
                        </div>
            </div>
        </Layout>
    )
}