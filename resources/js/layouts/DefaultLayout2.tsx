import React from "react";
import { Link, usePage } from "@inertiajs/react";
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

    return(
        <>
            <div>
                <header>HEADER</header>
            </div>
            
            <main>{children}</main>

            <footer>FOOTER</footer>
        </>
    )
}