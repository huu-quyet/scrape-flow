"use server"

import prisma from "@/lib/prisma"
import { workflowSchema, WorkflowSchema } from "@/schema/workflow"
import { WorkflowStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const createWorkflow = async (form: WorkflowSchema) => {
    const { success, data } = workflowSchema.safeParse(form)
    if (!success) {
        throw new Error("Invalid workflow data")
    }

    const { userId } = auth()

    if (!userId) {
        throw new Error("User not authenticated")
    }

    const result = await prisma.workflow.create({
        data: {
            ...data,
            userId,
            definition: "TODO",
            status: WorkflowStatus.DRAFT
        }
    })

    if (!result) {
        throw new Error("Failed to create workflow")
    }

    redirect("/workflows/editor/${result.id}")
}