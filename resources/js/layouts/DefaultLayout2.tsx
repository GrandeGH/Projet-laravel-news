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

    //  mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



    return(
        <>
        {/* Image de fond */}
        <div>
            <header className="z-10 relative">
                <div className="bg-orange-950 text-orange-300 p-5 fixed top-0 w-screen shadow-xl z-50">
                    <div className="flex justify-between max-w-7xl mx-auto">
                        <div>Tales Fandom</div>

                        {/* Bouton hamburger mobile */}
                        <button onClick={toggleMenu} className="md:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                        </button>

                        {['admin', 'webmaster', 'auteur'].includes(auth.user?.role) ? (
                            <div className="gap-3 flex me-20">
                                <Link href="/dashboard" className="text-blue-600 cursor-pointer">Dashboard</Link>
                                <p>Bonjour {auth.user?.name}</p>
                            </div>
                        ) : (
                            " "
                        )}
                        <div className="hidden md:flex gap-7 ">

                                <Link href="/articles" className="hover:font-semibold">
                                    Articles
                                </Link>
                                <Link href="/jeux" className="hover:font-semibold">
                                    Jeux
                                </Link>
                                <Link href="/categories" className="hover:font-semibold">
                                    Catégories
                                </Link>
                                <Link href="/tags" className="hover:font-semibold">
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

                        {/* Connexion, notif */}
                        {auth.user ? (
                            <div className="me-3 flex items-center gap-4">
                                <div className="me-3 p-1 rounded-full hover:bg-amber-400 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-300 hover:text-orange-950">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                </div>

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
                    </div>


                     {/* Menu mobile */}
                        {isMenuOpen && (
                            <div className="md:hidden bg-orange-900 px-4 py-4 space-y-2 text-orange-200">
                            <Link href="/articles" className="block hover:text-white">Articles</Link>
                            <Link href="/jeux" className="block hover:text-white">Jeux</Link>
                            <Link href="/categories" className="block hover:text-white">Catégories</Link>
                            <Link href="/tags" className="block hover:text-white">Tags</Link>

                            {/* Rech mobile */}
                            <input
                                type="text"
                                name="search"
                                placeholder="Recherche..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-gray-400 rounded px-3 py-1 text-sm focus:bg-white focus:text-black"
                            />

                            {/* Résultats de recherche aussi si tu veux */}

                            {auth.user ? (
                                <>
                                <Link href="/profil" className="block hover:text-white">Profil</Link>
                                <button onClick={deco} className="block text-left w-full hover:text-white">Déconnexion</button>
                                </>
                            ) : (
                                <>
                                <Link href="/login" className="block hover:text-white">Connexion</Link>
                                <Link href="/register" className="block hover:text-white">Inscription</Link>
                                </>
                            )}
                            </div>
                        )}
                </header>
                
                <div className="Navseparator mt-17"></div>
                <main className="p-4">{children}</main>

                {/* <footer>FOOTER</footer> */}
                </div>
            {/* </div> */}
        </>
    )
}