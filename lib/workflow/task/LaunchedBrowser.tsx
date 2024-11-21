import { TaskParamType, TaskType } from "@/types/task";
import { LucideProps, GlobeIcon } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCHED_BROWSER,
    label: 'Launched Browser',
    icon: (props: LucideProps) => (<GlobeIcon className="stroke-pink-400" {...props} />),
    isEntryPoint: true,
    inputs: [
        {
            name: "Website Url",
            type: TaskParamType.STRING,
            helperText: "The URL of the website to scrape",
            required: true,
            hideHandle: true
        }
    ]
}