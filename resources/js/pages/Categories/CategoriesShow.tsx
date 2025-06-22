import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function CategorieShow({categorie}) {

    return(
        <Layout>
            <h2 className="text-2xl m-3">Catégorie {categorie.name} </h2>

            {categorie.articles.map((article) => (
                <div className="m-3">
                    <h2 className="text-2xl">{article.title}</h2>

                    <Link href="">Lien vers l'article</Link>
                </div>
            ))}
        </Layout>
    )
}