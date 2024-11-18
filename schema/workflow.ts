import { z } from 'zod';

export const workflowSchema = z.object({
    name: z.string(),
    description: z.string().max(80).optional(),
});

export type WorkflowSchema = z.infer<typeof workflowSchema>;