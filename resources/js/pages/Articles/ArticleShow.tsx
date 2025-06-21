import Layout from "@/layouts/DefaultLayout2"
import { usePage, router } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { useState } from "react"

export default function ShowArticle({ article }) {
    const { auth } = usePage().props
    const [content, setContent] = useState("");
    const hasLiked = article.likes.some(like => like.user_id === auth.user?.id); // fonction like


    // fonction commentaire
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
                 
                {/* ---- Contenu ---- */}
                <div className="my-5 prose prose-invert leading-relaxed max-w-none text-base">{article.content}</div>               
                    
                {/* ---- Bouton Like ---- */}
                {auth.user && (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (hasLiked) {
                                router.post('/likes', {
                                    article_id: article.id,
                                    _method: 'DELETE'  // pour simuler un DELETE
                                }, { preserveScroll: true });
                            } else {
                                router.post('/likes', {
                                    article_id: article.id
                                }, { preserveScroll: true });
                            }
                        }}
                        className="mb-4"
                    >
                        <button className="text-sm text-blue-500 cursor-pointer">
                            {hasLiked ? 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-400">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                                :  
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red-400 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            } ({article.likes.length})
                        </button>
                    </form>
                )}

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