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
            formData.append("image", values.image)
        }
    
        // router.put(`/update/article/${article.id}`, formData);
        // router.get(`/detail/article/${article.id}`) //redirect à la page 

        // console.log("Catégorie ID envoyée :", values.categorie_id);
        // router.put(`/update/article/${article.id}`, formData, {
        // onSuccess: () => router.get(`/detail/article/${article.id}`)
        // });

        router.post(`/update/article/${article.id}`, formData, {
        onSuccess: () => router.get(`/detail/article/${article.id}`)
        });
        
    }

    return(
        <Layout>
            <div className="flex flex-col">
                <div>Modifier</div>
                <form action="" onSubmit={modifier} className="flex flex-col">
                    <label htmlFor="">Titre</label>
                    <input type="text" className="border border-white rounded" name="title" 
                        onChange={(e) => setValues({...values, title: e.target.value})} value={values.title} 
                    />
                    
                    <label htmlFor="">Slug</label>
                    <input type="text" className="border border-white rounded" name="slug" 
                        onChange={(e) => setValues({...values, slug: e.target.value})} value={values.slug} 
                    />

                    <label htmlFor="content">Content</label>
                    <textarea
                        className="border border-white rounded"
                        name="content"
                        value={values.content}
                        onChange={(e) => setValues({ ...values, content: e.target.value })}
                        ></textarea>


                    <label htmlFor="">Nouvelle image</label>
                    <input 
                        type="file" 
                        className="border border-white rounded"
                        accept="image/*"
                        onChange={(e) => setValues({ ...values, image: e.target.files[0] })}
                    />
                    
                    <label htmlFor="categorie_id">Catégorie</label>
                    <select
                    name="categorie_id"
                    className="border border-white rounded"
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

                    <button type="submit" className="border border-white rounded cursor-pointer">Envoyer la modification</button>
                </form>
            </div>
        </Layout>
    )
}
