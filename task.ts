


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
