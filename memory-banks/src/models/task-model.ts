export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: string | null;
  priority?: number | null;
  completed: boolean;
  createdAt: string; // ISO timestamp
}

export function validateTaskShape(obj: unknown): obj is Task {
  if (!obj || typeof obj !== "object") return false;
  const t = obj as any;
  return (
    typeof t.id === "number" &&
    typeof t.title === "string" &&
    typeof t.description === "string" &&
    typeof t.completed === "boolean" &&
    typeof t.createdAt === "string"
  );
}
