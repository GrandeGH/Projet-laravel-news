import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function CategorieIndex({categories}) {

    return(
        <Layout>
            <div className="m-5">
                <h2 className=" mb-3 text-2xl">Liste des catégories</h2>

                <ul className="list-disc list-inside">
                    {categories.length > 0 ? (
                        categories.map((categorie) => (
                            <li key={categorie.id} className="mb-2">
                                <Link 
                                    href={`/categories/${categorie.slug}`} 
                                    className="text-blue-600 hover:underline"
                                >
                                    {categorie.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>Aucune catégorie trouvée.</p>
                    )}
                </ul>
            </div>
        </Layout>
    )
}