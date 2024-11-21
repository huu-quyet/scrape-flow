import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../_components/Editor'

const page = async ({ params }: { params: { workflowId: string } }) => {
    const { workflowId } = params
    const { userId } = auth()
    if (!userId) {
        return <div>Not authenticated</div>
    }

    console.log('workflowId', workflowId)

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        }
    })

    console.log('workflow', workflow)

    if (!workflow) {
        return <div>Workflow not found</div>
    }

    return (
        <Editor workflow={workflow} />
    )
}

export default page