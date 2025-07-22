type TaskStatus = "pending" | "completed" | "in-progress" | "open";


interface ITask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: number;
  priority?: string;
  sortIndex?: number;
  status?: TaskStatus;
  userId: string;
  createdAt: string;
  reminder?: boolean;
  updatedAt?: string;
}

export { ITask, TaskStatus };
