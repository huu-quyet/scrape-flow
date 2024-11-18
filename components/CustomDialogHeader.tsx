"use client"

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface Props {
    icon?: LucideIcon
    title?: string
    subTitle?: string

    iconClassName?: string
    titleClassName?: string
    subtitleClassName?: string
}

const CustomDialogHeader = (props: Props) => {
    const { icon: Icon, title, subTitle, iconClassName, titleClassName, subtitleClassName } = props
    return (
        <DialogHeader className='py-6'>
            <DialogTitle asChild>
                <div className='flex flex-col items-center gap-2 mb-2'>
                    {Icon && <Icon className={cn("stroke-primary", iconClassName)} size={30} />}
                    {title && <h2 className={cn("text-xl text-primary", titleClassName)}>{title}</h2>}
                    {subTitle && <p className={cn("text-sm text-muted-foreground", subtitleClassName)}>{subTitle}</p>}
                </div>
            </DialogTitle>
        </DialogHeader>
    )
}

export default CustomDialogHeader