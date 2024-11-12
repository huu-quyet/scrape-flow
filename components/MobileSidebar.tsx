"use client"

import React from 'react'
import { Logo } from './Logo'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { routes } from '@/constants'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'



const MobileSidebar = () => {
    const [isOpen, setOpen] = React.useState(false)
    const pathName = usePathname()
    const activeRoute = routes.find(route => route.href.length > 0 && pathName.includes(route.href)) || routes[0]
    return (
        <div className='block border-separate bg-background md:hidden'>
            <nav className='container flex items-center justify-between px-8'>
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}><MenuIcon /></Button>
                    </SheetTrigger>
                    <SheetContent className='w-[400px] sm:w-[540px] space-y-4'>
                        <Logo />
                        <div className='flex flex-col gap-1'>
                            {routes.map(route => (<Link href={route.href} key={route.href} className={buttonVariants({
                                variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
                            })}
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                <route.icon size={20} />
                                {route.label}
                            </Link>))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default MobileSidebar