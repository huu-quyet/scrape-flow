"use client"

import { TaskParam, TaskParamType } from "@/types/task"
import StringParam from "./param/StringParam"
import { useReactFlow } from "@xyflow/react"
import { AppNode } from "@/types/appNode"

const NodeParamField = ({ param, nodeId }: { param: TaskParam, nodeId: string }) => {
    const { updateNodeData, getNode } = useReactFlow()
    const node = getNode(nodeId) as AppNode
    const value = node?.data.inputs?.[param.name]

    switch (param.type) {
        case TaskParamType.STRING:
            return <StringParam param={param} />
        default:
            return <div className="w-full">
                <p className="text-xs text-muted-foreground">
                    Not implemented
                </p>
            </div>
    }
    return (
        <div>NodeParamField</div>
    )
}

export default NodeParamField