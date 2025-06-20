import Layout from "@/layouts/DefaultLayout2"
import { usePage, router } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { useState } from "react"

export default function ShowArticle({ article }) {
    const { auth } = usePage().props
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/commentaires", {
            article_id: article.id,
            content,
        }, {
            onSuccess: () => setContent("")
        });
    }

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
                <div className="my-5 prose prose-invert leading-relaxed max-w-none text-base">{article.content}</div>               
                    
                {/* Commentaires */}
                <div>
                    <h2 className="text-2xl mb-3">Commentaire</h2>

                    {auth.user && (
                        <form onSubmit={handleSubmit}>
                            <textarea 
                            className="border w-full p-3 rounded-2xl"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Laissez un commentaire ici..."
                            ></textarea>

                            <button className="cursor-pointer border border-white rounded-3xl p-2 mb-5">
                                Envoyer
                            </button>
                        </form>
                    )}          

                    {article.commentaires.map((com) => (
                        <div key={com.id} className="border border-white rounded mb-2">
                            <p className="pt-3 ps-3"><strong>@{com.user?.name ?? "anonyme"}</strong></p>
                            <p className="p-3">{com.content}</p>
                        </div>
                    ))}

                
                </div>



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