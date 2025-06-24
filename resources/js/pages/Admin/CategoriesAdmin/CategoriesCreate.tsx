import { useState } from "react";
import { router } from "@inertiajs/react";
import Layout from "@/layouts/DefaultLayout2"

export default function CreateCategorie() {
    const [values, setValues] = useState({
        name:"",
        slug: "",
    })

    const ajouter = (e) => {
        e.preventDefault()
        router.post('/post/categorie', values)
        router.get('/categories')

    }
    console.log(values)

    return(
        <Layout> 
             <div className="m-6"> 
                <h2 className="text-3xl mb-3">Ajouter une catégorie</h2>
                <form onSubmit={ajouter} className="flex flex-col">
                    <div className="flex flex-col ">
                        <label className="mb-1">Nom du catégorie</label>
                        <div className="mb-3">
                            <input className="border border-white rounded w-100" type="text" name="name" id="" onChange={(e) => setValues({...values, name: e.target.value})} />
                        </div>

                        <label className="mb-1">Slug</label>
                        <div className="">
                            <input className="border border-white rounded w-100" type="text" name="slug" id="" onChange={(e) => setValues({...values, slug: e.target.value})} />
                        </div>

                        <div>
                            <button className="border border-white p-1 rounded mt-5 cursor-pointer" type="submit">Ajouter</button>
                        </div>
                    </div>
                </form>
            </div>         
        </Layout>
    )

}