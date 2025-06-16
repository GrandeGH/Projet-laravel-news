// import React, { PropsWithChildren } from 'react';
// import { Link, usePage } from '@inertiajs/react';
// import AppLogoIcon from '@/components/app-logo-icon';
// import { NavigationMenuLink } from '@/components/ui/navigation-menu';

// interface DefaultLayoutProps extends PropsWithChildren {
//     auth: { user: {id: number; name: string; email: string; role:string} | null};
// }

// export default function DefaultLayout({auth, children}: DefaultLayoutProps) {
    
//     const { auth } = usePage().props


//     return(
//         <>
//         <div>
//             <nav className='bg-amber-300'>
//                 <div>
//                     <AppLogoIcon/>
//                     {/* Lien */}
//                     <NavigationMenuLink href='' className=''>
//                         Accueil
//                     </NavigationMenuLink>
//                     <NavigationMenuLink href='' className=''>
//                         Catégories
//                     </NavigationMenuLink>
//                     <NavigationMenuLink href='' className=''>
//                         Tag
//                     </NavigationMenuLink>
//                 </div>
//                 <div className=''>
//                     <Link href='/login'>Connexion</Link>
//                     <Link href='/register'>Inscription</Link>
//                 </div>
//             </nav>

//             <main>{children}</main>
//         </div>
//         </>
//     )
// }

