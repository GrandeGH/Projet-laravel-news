import { useState } from "react";
import { router } from "@inertiajs/react";
import Layout from "@/layouts/DefaultLayout2"


export default function CreateArticle( { categories, tags }) {
    const [values, setValues] = useState({
        title:"",
        slug:"", 
        content:"",   
        image: null,
        categorie_id: categories?.[0]?.id ?? 1, // Sélection par défaut // corriger
        tags: [],
        published: false,
    });


    const ajouter = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', values.content);
        formData.append('published', values.published ? '1' : '0');
        formData.append('categorie_id', values.categorie_id.toString());
        values.tags.forEach((tagId, index) => {
            formData.append(`tags[${index}]`, tagId);
        });
        if (values.image) {
            formData.append('image', values.image);
        }

        router.post('/post/article', formData, {
            onSuccess: () => {
            console.log("✅ Article envoyé avec succès !");
            router.get('/articles');
            // Tu peux aussi reset le formulaire ici si tu veux :
            // setValues({ title: "", slug: "", content: "", image: null, categorie_id: 1, published: false });
            // Et rediriger ou afficher un message
            },
            onError: (errors) => {
            console.error("❌ Erreurs lors de l'envoi :", errors);
         }
        });

    };

    console.log(values)

    return(
        <Layout>
            <div className="m-6"> 
                <h1 className="text-2xl mb-3">Créer un article</h1>
                <form onSubmit={ajouter} className="">
                    <div className="">
                        {/* Nom Article */}
                        <div className=" flex flex-col">
                            <label className="mb-2">Nom de l'article</label>
                            <input 
                                className="border border-white rounded mb-2 w-lg" 
                                value={values.title} 
                                type="text" 
                                onChange={(e) => setValues({...values, title: e.target.value})} 
                            />
                        </div>

                        {/* Slug */}
                        <div className="flex flex-col">
                            <label className="mb-2">Slug</label>
                            <input 
                                className="border border-white rounded mb-2 w-lg" 
                                value={values.slug}                             
                                type="text"
                                name="slug"
                                onChange={(e) => setValues({...values, slug: e.target.value})} 
                                
                            />
                        </div>

                        {/* Texte */}
                        <div className="flex flex-col">
                            <label className="mb-2">Texte</label>
                            <textarea 
                            className="border border-white rounded w-lg h-max"
                            name="content" 
                            value={values.content}
                            onChange={(e) => setValues({...values, content: e.target.value})}                         
                            ></textarea>
                        </div>
        
                        {/* Image */}
                        <div className="flex flex-col">
                            <label className="mb-2">Image couverture</label>
                            <input 
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setValues({ ...values, image: e.target.files[0] })}
                                className="mb-2 cursor-pointer border border-white p-1 rounded " 
                            />
                        </div>

                        {/* Catégories */}
                        <div className="flex flex-col">
                            <label className="mb-2">Catégories</label>
                            <select 
                                name="categorie_id"
                                value={values.categorie_id}
                                onChange={(e) => setValues({...values, categorie_id: parseInt(e.target.value)})}
                                className="border border-white rounded mb-2 p-1"
                                >
                                {categories.map((categorie) => (
                                    <option key={categorie.id} value={categorie.id} className="bg-black">
                                        {categorie.name}
                                    </option>
                                ))}
                                </select>
                        </div>
                        <div className="mb-5">
                            <label className="mb-4">Ajoutés les tags</label>
                            <div className="flex flex-wrap gap-2.5">
                                {tags.map((tag) => (
                                    <label key={tag.id} className="flex items-center gap-1">
                                        <input 
                                            type="checkbox" 
                                            value={tag.id}
                                            checked={values.tags.includes(tag.id)}
                                            onChange={(e) => {
                                                const newTags = e.target.checked
                                                    ? [...values.tags, tag.id]
                                                    : values.tags.filter((t) => t !== tag.id);
                                                setValues({ ...values, tags: newTags });
                                            }}
                                        />
                                        {tag.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Publication */}
                        <div className="flex">
                            <label className="mb-2">Publié (ou en broullion si pas coché)</label>
                            <input 
                                name="published"
                                type="checkbox"
                                checked={values.published}
                                onChange={(e) => setValues({ ...values, published: e.target.checked })}
                                className="mb-2 cursor-pointer border border-white p-1 rounded " 
                            />
                        </div>


                        <button className=" border border-white p-1 rounded mt-5" type="submit">Envoyer l'article</button>
                    </div>
                </form>       
            </div>
        </Layout>
    )

}