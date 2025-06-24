import Layout from "@/layouts/DefaultLayout2"
import { usePage } from "@inertiajs/react";


export default function MonProfil() {

    const { user } = usePage().props;

    return(
        <Layout>
            <div>page profil</div>
        </Layout>
    )
}