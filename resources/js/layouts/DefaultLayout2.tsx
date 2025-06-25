import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, usePage, router } from "@inertiajs/react";

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

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<{ articles: any[], tags: any[], categories: any[] }>({ articles: [], tags: [], categories: [] });
    const [showModal, setShowModal] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Requête automatique au changement du texte
    useEffect(() => {
        if (searchQuery.length > 1) {
            axios.get(`/search?q=${searchQuery}`)
                .then((res) => {
                    setResults(res.data);
                    setShowModal(true);
                })
                .catch(() => {
                    setResults({ articles: [], tags: [], categories: [] });
                    setShowModal(false);
                });
        } else {
            setShowModal(false);
        }
    }, [searchQuery]);

    // Fermer la recherche si clic en dehors
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    const deco = () => { //Deconnexion 
        router.post('/logout')
    }


    return(
        <>
        {/* Image de fond */}
        <div>
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


                      {/* Barre de recherche */}
                        <div className="relative" ref={searchRef}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Recherche..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-400 rounded px-3 py-1 text-sm focus:bg-white focus:text-black"
                            />

                            {showModal && (
                                <div className="absolute top-10 right-0 z-50 bg-white text-black w-80 max-h-96 overflow-y-auto shadow-lg rounded p-4">
                                
                                    <h4 className="text-sm font-bold mb-1 text-gray-600">Articles</h4>
                                    {results.articles.length > 0 ? (
                                        results.articles.map((a) => (
                                            <Link key={a.id} href={`/detail/article/${a.id}`} className="block hover:bg-gray-200 p-1 rounded">
                                                {a.title}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500">Aucun article trouvé</p>
                                    )}

                                    <h4 className="text-sm font-bold mt-4 mb-1 text-gray-600">Tags</h4>
                                    {results.tags.length > 0 ? (
                                        results.tags.map((t) => (
                                            <Link key={t.id} href={`/tags`} className="block hover:bg-gray-200 p-1 rounded">
                                                {t.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500">Aucun tag trouvé</p>
                                    )}

                                    <h4 className="text-sm font-bold mt-4 mb-1 text-gray-600">Catégories</h4>
                                    {results.categories.length > 0 ? (
                                        results.categories.map((c) => (
                                            <Link key={c.id} href={`/categories`} className="block hover:bg-gray-200 p-1 rounded">
                                                {c.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500">Aucune catégorie trouvée</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {auth.user ? (
                            <div className="me-3 flex gap-4">
                                <Link href="/profil" className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 border border-orange-300 hover:bg-orange-300 hover:text-orange-950 rounded-2xl p-1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </Link>
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