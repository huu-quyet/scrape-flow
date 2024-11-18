import { getWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'
import WorkflowCard from './_components/WorkflowCard'

const page = () => {
    return (
        <div className='flex-1 flex flex-col h-full'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>Workflows</h1>
                    <p className='text-muted-foreground'>Manage your workflows</p>
                </div>
                <CreateWorkflowDialog />
            </div>

            <div className='h-full py-6'>
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkflows />
                </Suspense>
            </div>
        </div>
    )
}

function UserWorkflowsSkeleton() {
    return (
        <div className='space-y-2'>
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-32 w-full' />
            ))}
        </div>
    )
}

async function UserWorkflows() {
    try {
        const workflows = await getWorkflowsForUser()
        if (workflows.length === 0) {
            return <div className='flex flex-col gap-4 h-full items-center justify-center'>
                <div className='rounded-full bg-accent h-20 w-20 flex items-center justify-center'>
                    <InboxIcon size={40} className='stroke-primary' />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='font-bold'>Not workflow created yet</p>
                    <p className='text-sm text-muted-foreground'>Click the button below to create your first workflow</p>
                </div>
                <CreateWorkflowDialog triggerText='Create your first workflow' />
            </div>
        }

        return <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {workflows.map(workflow => <WorkflowCard key={workflow.id} workflow={workflow} />)}
        </div>
    } catch (error) {
        return <Alert variant="default">
            <AlertCircle className='w-4 h-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to fetch workflows</AlertDescription>
        </Alert>
    }
}

export default page