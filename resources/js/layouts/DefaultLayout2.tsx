import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

// interface PageProps {
//     flash: {
//         message?:string;
//     };
//     auth: {
//         user?: {
//             id: number;
//             name: string;
//             email: string;
//             role?: string;
//         };
//     };
// }

export default function Layout({children}: LayoutProps) {
    // const { flash, auth } = usePage<PageProps>().props;
    const { auth } = usePage().props

    const deco = () => {
        router.post('/logout')
    }

    return(
        <>
            <header className="bg-amber-50 text-black p-5 fixed top-0 w-screen">
                <div className="flex justify-between">
                    <div>Tales Fandom</div>
                    {['admin', 'webmaster', 'auteur', 'lecteur'].includes(auth.user?.role) ? (
                        <p>Visible pour tous les rôles (Dashboard)</p>
                    ) : (
                        " "
                    )}
                    <div className="flex gap-6">

                            <Link href="/articles">
                                Articles
                            </Link>
                            <Link href="/jeux">
                                Jeux
                            </Link>
                            <Link href="/categories">
                                Catégories
                            </Link>
                            <Link href="/tags">
                                Tags
                            </Link>
                    </div>

                    {auth.user ? (
                        <div className="me-3">
                            <button onClick={deco} className="cursor-pointer">Deconnexion</button>
                        </div>
                    ) : (
                        <div className="">
                            <Link className="cursor-pointer me-3" href="/login">
                                <button>Connexion</button>
                            </Link>
                            <Link className="cursor-pointer " href="/register">
                                <button>Inscription</button>
                            </Link>
                        </div>
                    )
                    }
                </div>
            </header>
            
            <div className="Navseparator mt-15"></div>
            <main className="p-4">{children}</main>

            {/* <footer>FOOTER</footer> */}
        </>
    )
}