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
            <header className="bg-amber-50 text-black p-5 fixed top-0 w-screen shadow-xl z-40">
                <div className="flex justify-between">
                    <div>Tales Fandom</div>
                    {['admin', 'webmaster', 'auteur', 'lecteur'].includes(auth.user?.role) ? (
                        <div className="gap-3 flex">
                            <Link href="/dashboard" className="text-blue-600 cursor-pointer">Dashboard</Link>
                            <p>Bonjour {auth.user?.name}</p>
                        </div>
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
                        <div className="me-3 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 border border-black rounded-2xl p-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
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