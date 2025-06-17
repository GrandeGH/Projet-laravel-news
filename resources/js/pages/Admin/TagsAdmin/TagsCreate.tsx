import { useState } from "react";
import { router } from "@inertiajs/react";

export default function CreateTag() {
    const [values, setValues] = useState({
        nomVariable:"",
        number: 0,
        id: 1
    })

    const ajouter = (e) => {
        e.preventDefault()
        router.post('post/nomRoute', values)
        router.get('nomRoute')

    }
    console.log(values)

    return(
        <> 
            <form onSubmit={ajouter}>
                <div>
                    <label htmlFor="">Nom de l'article</label>
                    <input className="border border-white rounded" type="text" name="" id="" onChange={(e) => setValues({...values, nomVariable: e.target.value})} />
                
                    <button type="submit">Ajouter</button>
                </div>
            </form>       
        </>
    )

}