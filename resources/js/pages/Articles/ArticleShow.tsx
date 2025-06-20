import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function ShowArticle({ article }) {
    const { auth } = usePage().props

    return(
        <Layout>
           <div className="max-w-4xl mx-auto py-8 px-4">

                <div>
                    {article.categorie && (
                        <div className="mb-5">
                            <span className="text-sm text-gray-400 tracking-wide">
                                <strong>Catégorie :</strong> {article.categorie.name}
                            </span>
                        </div>
                    )}
                </div>

                {/* Titre */}
                <div className="text-2xl font-semibold mb-4 sm:text-3xl text-center">
                    {article.title}
                </div>

                {/* image */}
                {article.image && (
                    <img 
                        src={`/storage/${article.image}`}
                        alt={article.title}
                        className="w-full max-h-90 object-cover"
                    />
                )}
                {/* tag */}
                <div className="flex flex-wrap my-3 gap-2">
                    {article.tags?.length > 0 ? (
                        article.tags.map(tag => (
                            <span 
                                key={tag.id}
                                className="text-sm border border-white rounded-3xl px-3 py-1">
                                {tag.name}
                            </span>
                        )) 
                        ) : (
                        <span className="text-sm text-gray-400">Aucun tag</span>
                    )}
                </div>
                 
                 {/* Contenu */}
                <div className="mt-5 prose prose-invert leading-relaxed max-w-none text-base">{article.content}</div>               
                    
                {/* Retour */}
                <div className="mt-5">
                    <Link 
                        href="/articles" 
                        className="text-blue-500 text-sm hover:underline">
                        ← Retour aux articles
                    </Link>
                </div>
           </div>
        </Layout>
    )
}