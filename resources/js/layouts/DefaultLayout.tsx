import React, { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

interface DefaultLayoutProps extends PropsWithChildren {
    auth: { user: {id: number; name: string; email: string; role:string} | null};
}

export default function DefaultLayout({auth, children}: DefaultLayoutProps) {
    
    return(
        <>
        <div>Test</div>
        </>
    )
}

