import { NodeProps } from '@xyflow/react'
import React, { memo } from 'react'
import NodeCard from './NodeCard'
import NodeHeader from './NodeHeader'
import { AppNodeData } from '@/types/appNode'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { NodeInput, NodeInputs } from './NodeInputs'

const NodeComponent = (props: NodeProps) => {
    const nodeData = props.data as AppNodeData
    const task = TaskRegistry[nodeData.type]

    return (
        <NodeCard nodeId={props.id} isSelected={!!props.selected}>
            <NodeHeader taskType={nodeData.type} />
            <NodeInputs>
                {task.inputs.map(input => (
                    <NodeInput input={input} key={input.name} nodeId={props.id} />
                ))}
            </NodeInputs>
        </NodeCard>
    )
}

export default memo(NodeComponent)
NodeComponent.displayName = 'NodeComponent'