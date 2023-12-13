// store.ts
import create from 'zustand';
import { ITask } from '@/types/tasks'; // Adjust the import path as necessary

interface TaskState {
  tasks: ITask[];
  addTask: (newTask: ITask) => void;
  fetchTasks: () => Promise<void>;
  setTasks: (tasks: ITask[]) => void;
  editTask: (updatedTask: ITask) => void;
  deleteTask: (id: string) => void;
  markTaskAsDone: (id: string) => void;
}

const useStores = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    // Implementation of fetching tasks from the server
    // and updating the store
    const response = await fetch('http://localhost:3001/tasks');
    const tasks = await response.json();
    set({ tasks });
  },
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  setTasks: (tasks) => set({ tasks }),
  editTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  markTaskAsDone: (id) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, isDone: true } : task)
  }))
}));

export default useStores;
