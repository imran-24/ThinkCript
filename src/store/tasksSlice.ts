import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "../../task";
import { v4 as uuidv4 } from "uuid";

// Sample initial tasks
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description:
      "Finish writing the project proposal for the client meeting next week.",
    category: "Office",
    status: "Pending",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "2",
    title: "Grocery shopping",
    description: "Buy fruits, vegetables, and other essentials",
    category: "Personal",
    status: "Completed",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "3",
    title: "Schedule dentist appointment",
    description: "Call the dentist office to schedule a checkup",
    category: "Personal",
    status: "Pending",
    createdAt: Date.now() - 43200000,
  },
  {
    id: "4",
    title: "Team meeting",
    description: "Prepare slides for the weekly team meeting",
    category: "Office",
    status: "Pending",
    createdAt: Date.now() - 21600000,
  },
  {
    id: "5",
    title: "Fix bike",
    description: "Take bike to repair shop or fix the flat tire",
    category: "Others",
    status: "Pending",
    createdAt: Date.now() - 10800000,
  },
];

const initialState: TasksState = {
  tasks: sampleTasks,
  filteredTasks: sampleTasks,
  filter: {
    category: "All",
    status: "All",
    searchQuery: "",
  },
};

const applyFilters = (tasks: Task[], filter: TasksState["filter"]) => {
  return tasks.filter((task) => {
    const categoryMatch =
      filter.category === "All" || task.category === filter.category;
    const statusMatch =
      filter.status === "All" || task.status === filter.status;
    const searchMatch =
      filter.searchQuery === "" ||
      task.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.searchQuery.toLowerCase());

    return categoryMatch && statusMatch && searchMatch;
  });
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask: Task = {
        id: uuidv4(),
        ...action.payload,
        createdAt: Date.now(),
      };
      state.tasks.unshift(newTask);
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; task: Partial<Task> }>
    ) => {
      const { id, task } = action.payload;
      const existingTask = state.tasks.find((t) => t.id === id);
      if (existingTask) {
        Object.assign(existingTask, task);
      }
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === "Completed" ? "Pending" : "Completed";
      }
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload;
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filter.status = action.payload;
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filter.searchQuery = action.payload;
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
    reorderTasks(state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks.splice(sourceIndex, 1); // Remove the task
      state.tasks.splice(destinationIndex, 0, movedTask); // Insert at new position
      state.filteredTasks = applyFilters(state.tasks, state.filter);

    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
  setCategoryFilter,
  setStatusFilter,
  reorderTasks,
  setSearchQuery,
} = tasksSlice.actions;

export default tasksSlice.reducer;
