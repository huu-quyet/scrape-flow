"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Layers2Icon, Loader2 } from 'lucide-react'
import React from 'react'
import CustomDialogHeader from '../../../../components/CustomDialogHeader'
import { useForm } from 'react-hook-form'
import { WorkflowSchema, workflowSchema } from '@/schema/workflow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { createWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const form = useForm<WorkflowSchema>({
        defaultValues: {},
        resolver: zodResolver(workflowSchema),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: createWorkflow,
        onSuccess: () => {
            toast.success('Workflow created successfully', {
                id: 'workflow-created'
            })
        },
        onError: () => {
            toast.error('Failed to create workflow', {
                id: 'workflow-failed'
            })
        }
    })

    const onSubmit = (data: WorkflowSchema) => {
        toast.loading('Creating workflow...', {
            id: 'creating-workflow'
        })
        mutate(data)
    }

    return (
        <Dialog open={isOpen} onOpenChange={open => {
            form.reset()
            setIsOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent className='px-0' aria-describedby="create-workflow">
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title='Create a new workflow'
                    subTitle="Start building your workflow"
                />
                <div className='p-6'>
                    <Form {...form}>
                        <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription aria-describedby='name'>
                                        Choose a descriptive and unique name
                                    </FormDescription>
                                    <FormMessage aria-describedby='name' />
                                </FormItem>}
                            />

                            <FormField
                                name='description'
                                control={form.control}
                                render={({ field }) => <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className='resize-none' {...field} />
                                    </FormControl>
                                    <FormDescription aria-describedby='description'>
                                        Provide a brief description of the workflow. <br /> This is optional but can help you and your team understand the purpose of the workflow.
                                    </FormDescription>
                                    <FormMessage aria-describedby='description' />
                                </FormItem>}
                            />
                            <Button type='submit' className='w-full' disabled={isPending}>{!isPending ? "Proceed" : <Loader2 className='animate-spin' />}</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog