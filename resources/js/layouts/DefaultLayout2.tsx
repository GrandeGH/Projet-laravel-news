import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import { url } from "inspector";

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
        {/* Image de fond */}
        <div
            //     style={{
            //         position: "absolute",
            //         top: 0,
            //         left: 0,
            //         width: "100%",
            //         // height: "100%",
            //         minHeight:"100%",
            //         backgroundImage: "url('/images/Bg_Tales_of_Arise.png')",
            //         backgroundAttachment: "fixed",
            //         backgroundSize: "cover",
            //         backgroundPosition: "center",
            //         zIndex: 100,
            //     }}
            // >

            // {/* Overlay noir semi-transparent */}
            // <div
            //     style={{
            //         position: "absolute",
            //         top: 0,
            //         left: 0,
            //         width: "100%",
            //         minHeight: "100%",
            //         backgroundColor: "rgba(0, 0, 0, 0.7)",
            //         zIndex: -1,
            //     }}
            >
            {/* <div className="absolute inset-0 bg-black/50 z-0"></div> */}
            <div className="z-10 relative">
                <header className="bg-orange-950 text-orange-300 p-5 fixed top-0 w-screen shadow-2xl z-50">
                    <div className="flex justify-between">
                        <div>Tales Fandom</div>
                        {['admin', 'webmaster', 'auteur'].includes(auth.user?.role) ? (
                            <div className="gap-3 flex me-20">
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

                        {/* Formulaire de recherche */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.get("/articles", { search: e.target.search.value }, { preserveScroll: true });
                            }}
                            className="ms-4"
                        >
                            <input
                                type="text"
                                name="search"
                                placeholder="Rechercher..."
                                className="border border-gray-400 rounded px-3 py-1 text-sm"
                            />
                        </form>

                        {auth.user ? (
                            <div className="me-3 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 border border-orange-300 rounded-2xl p-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <button onClick={deco} className="cursor-pointer">Deconnexion</button>
                            </div>
                        ) : (
                            <div className="me-3">
                                <Link className=" me-3" href="/login">
                                    <button className="cursor-pointer">Connexion</button>
                                </Link>
                                <Link className=" " href="/register">
                                    <button className="cursor-pointer">Inscription</button>
                                </Link>
                            </div>
                            )
                            }
                        </div>
                    </header>
                </div>
                
                <div className="Navseparator mt-17"></div>
                <main className="p-4">{children}</main>

                {/* <footer>FOOTER</footer> */}
                </div>
            {/* </div> */}
        </>
    )
}