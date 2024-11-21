export enum TaskType {
    LAUNCHED_BROWSER = 'LAUNCHED_BROWSER',
}

export enum TaskParamType {
    STRING = 'STRING',
    NUMBER = 'NUMBER'
}

export interface TaskParam {
    name: string
    type: TaskParamType
    helperText?: string
    required?: boolean
    hideHandle?: boolean
    value?: string
    [key: string]: any
}