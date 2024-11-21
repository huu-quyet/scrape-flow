import { deleteWorkflow } from "@/actions/workflows/deleteWorkflow"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId }: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    workflowName: string
    workflowId: string
}) => {
    const [confirmText, setConfirmText] = useState("")

    const deleteMutation = useMutation({
        mutationFn: deleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully")
            setOpen(false)
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "An error occurred")
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you proceed, this action cannot be undone. This will permanently delete the workflow.
                        <div className="flex flex-col py-4 gap-2">
                            <p>
                                If you are sure, enter <b>{workflowName}</b> to confirm:
                            </p>
                            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => { setConfirmText("") }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={confirmText !== workflowName || deleteMutation.isPending}
                        onClick={(e) => {
                            e.stopPropagation()
                            toast.loading("Deleting workflow...")
                            deleteMutation.mutate(workflowId)
                        }}
                    >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog