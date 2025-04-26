import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string({ message: "Category is required" }).array(),
  status: z.string({ message: "Status is required" }).array(),
});

export type FormValues = z.infer<typeof formSchema>;



export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: number;
}

export interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  filter: {
    category: string;
    status: string;
    searchQuery: string;
  };
}
