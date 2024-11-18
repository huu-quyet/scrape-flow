"use client"

import TooltipWrapper from "@/components/TooltipWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { WorkflowStatus } from "@/types/workflow"
import { Workflow } from "@prisma/client"
import { FileTextIcon, MoreVertical, PlayIcon, ShuffleIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

interface WorkflowCardProps {
    workflow: Workflow
}

const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
    [WorkflowStatus.PUBLISHED]: "bg-primary",
}

const WorkflowCard = (props: WorkflowCardProps) => {
    const isDraft = props.workflow.status === WorkflowStatus.DRAFT

    return (
        <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
            <CardContent className="p-4 flex items-center justify-between h-[100px]">
                <div className="flex items-center space-x-2">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColors[props.workflow.status as WorkflowStatus])}>
                        {isDraft ? (<FileTextIcon className="h-5 w-5" />) : (<PlayIcon className="h-5 w-5 text-white" />)}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-muted-foreground flex- items-center">
                            <Link
                                href={`/workflows/editor/${props.workflow.id}`}
                                className="flex items-center hover:underline"
                            >{props.workflow.name}</Link>
                            {isDraft && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link
                        href={`/workflows/editor/${props.workflow.id}`}
                        className={cn(buttonVariants({
                            variant: "outline",
                            size: "sm",
                        }),
                            "flex items-center gap-2")}
                    ><ShuffleIcon size={16} />Edit</Link>
                    <WorkflowActions />
                </div>
            </CardContent>
        </Card>
    )
}

function WorkflowActions() {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
                <TooltipWrapper content="More Actions">
                    <div className="flex items-center justify-center w-full h-full">
                        <MoreVertical size={18} />
                    </div>
                </TooltipWrapper>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive flex items-center gap-2">
                <Trash2Icon size={16} />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default WorkflowCard