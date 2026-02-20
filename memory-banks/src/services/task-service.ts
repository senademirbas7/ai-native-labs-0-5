import LocalStorageAdapter, { LOCALSTORAGE_KEY_TASKS_V1 } from "./local-storage-adapter";
import { Task } from "../models/task-model";

export interface AddTaskParams {
  title: string;
  description?: string;
  dueDate?: string | null;
  priority?: number | null;
}

export function getTasks(): Task[] {
  const raw = LocalStorageAdapter.get<Task[]>(LOCALSTORAGE_KEY_TASKS_V1);
  return Array.isArray(raw) ? raw : [];
}

export function saveTasks(tasks: Task[]): void {
  LocalStorageAdapter.set(LOCALSTORAGE_KEY_TASKS_V1, tasks);
}

export function addTask(params: AddTaskParams): Task {
  const { title, description = "", dueDate = null, priority = null } = params;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("title is required and must be a non-empty string");
  }

  const tasks = getTasks();
  let nextId = 1;
  if (tasks.length > 0) {
    const numericIds = tasks.map((t) => Number(t.id)).filter((n) => !Number.isNaN(n));
    nextId = numericIds.length ? Math.max(...numericIds) + 1 : tasks.length + 1;
  }

  const task: Task = {
    id: nextId,
    title: title.trim(),
    description: description || "",
    dueDate: dueDate ?? null,
    priority: priority ?? null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveTasks(tasks);
  return task;
}

export default {
  getTasks,
  saveTasks,
  addTask,
};
