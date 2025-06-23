import { useState } from "react"
import { router } from "@inertiajs/react"
import Layout from "@/layouts/DefaultLayout2"

export default function ArticleEdit( {article, categories, tags} ) {
    const [values, setValues] = useState({
        title: article.title,
        slug: article.slug,
        content: article.content,
        image: null,
        published: article.published,
        tags: article.tags?.map(tag => tag.id), 
        categorie_id: article.categorie_id ?? categories[0]?.id ?? "",
    })    

    const modifier = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', values.content);
        formData.append('published', values.published ? "1" : "0");
        formData.append('categorie_id', parseInt(values.categorie_id));
        formData.append('_method', 'PUT'); // ajouter

        values.tags.forEach((tagId, i) => {
            formData.append(`tags[${i}]`, tagId)
        })

 if (values.image) {
        formData.append("image", values.image);
        console.log("📸 Image détectée :", values.image.name, values.image.size, values.image.type);
    } else {
        console.warn("⚠️ Aucune image sélectionnée !");
    }

    // 🔍 DEBUG : Affiche tout ce qui est dans le FormData
    console.log("📦 Données envoyées :");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Envoi
    router.post(`/update/article/${article.id}`, formData, {
        onSuccess: () => router.get(`/detail/article/${article.id}`),
        onError: (errors) => {
            console.error("❌ Erreurs lors de la soumission :", errors);
        }
    });
};

    return(
        <Layout>
            <div className="m-6 flex flex-col">
                <div className="text-3xl mb-5">Modifier</div>
                <form action="" onSubmit={modifier} className="flex flex-col">
                    <label htmlFor="">Titre</label>
                    <input type="text" className="mb-3 border border-white rounded" name="title" 
                        onChange={(e) => setValues({...values, title: e.target.value})} value={values.title} 
                    />
                    
                    <label htmlFor="">Slug</label>
                    <input type="text" className="mb-3 border border-white rounded" name="slug" 
                        onChange={(e) => setValues({...values, slug: e.target.value})} value={values.slug} 
                    />

                    <label htmlFor="content">Content</label>
                    <textarea
                        className="mb-3 border border-white rounded"
                        name="content"
                        value={values.content}
                        onChange={(e) => setValues({ ...values, content: e.target.value })}
                        ></textarea>


                    <label htmlFor="">Nouvelle image</label>
                    <input 
                        type="file" 
                        className="mb-3 border border-white rounded"
                        accept="image/*"
                        onChange={(e) => setValues({ ...values, image: e.target.files[0] })}
                    />
                    
                    <label htmlFor="categorie_id">Catégorie</label>
                    <select
                    name="categorie_id"
                    className="mb-3 border border-white rounded"
                    value={values.categorie_id}
                    onChange={(e) => setValues({ ...values, categorie_id: e.target.value })}
                    >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                        </option>
                    ))}
                    </select>
                    

                    <div>
                        <label className="mb-4">Ajoutez les tags</label>
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

                    
                    <label>
                        <input 
                            type="checkbox"
                            checked={values.published}
                            onChange={(e) => setValues({ ...values, published: e.target.checked })}
                        />
                        Article à publier
                    </label>
                    <div>
                        <button type="submit" className="mt-3 border border-white rounded cursor-pointer px-3 py-1">Envoyer la modification</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
