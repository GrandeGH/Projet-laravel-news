import { useState } from "react"
import { router } from "@inertiajs/react"
import Layout from "@/layouts/DefaultLayout2"


export default function CategorieEditAdmin( { categorie }) {

    const [values, setValues] = useState({
        name: categorie.name, 
        slug: categorie.slug,
    })

    const modifier = (e) => {
        e.preventDefault();
        router.put(`/update/categorie/${categorie.id}`, values);
        router.get('/categories') 
    }


    return(
        <Layout>
            <div className="m-6">
                <h2 className="text-2xl mb-3">Modifier catégorie</h2>
                <form action="" onSubmit={modifier} className="flex flex-col">
                    <label htmlFor="">Titre</label>
                    <input type="text" className="mb-3 border border-white rounded" name="title" 
                        onChange={(e) => setValues({...values, name: e.target.value})} value={values.name} 
                    />
                    
                    <label htmlFor="">Slug</label>
                    <input type="text" className="mb-3 border border-white rounded" name="slug" 
                        onChange={(e) => setValues({...values, slug: e.target.value})} value={values.slug} 
                    />

                    <div>
                        <button type="submit" className="mt-3 border border-white rounded cursor-pointer px-3 py-1">Envoyer la modification</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}