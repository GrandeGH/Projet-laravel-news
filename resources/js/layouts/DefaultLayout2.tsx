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
            <header className="bg-amber-50 text-black p-4 fixed top-0 w-screen">
                <div className="flex justify-between">
                    <div>Logo</div>
                    {['admin', 'webmaster', 'auteur', 'lecteur'].includes(auth.user?.role) ? (
                        <p>Visible pour tous les rôles (Dashboard)</p>
                    ) : (
                        " "
                    )}

                    {auth.user ? (
                        <div>
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