import { UnixTimestampMs } from "./UnixTimestampMs";

export enum TodoStatus {
    NotStarted,
    InProgress,
    Done,
}

/**
 * Represents a TODO task
 */
export interface Todo {
    /**
     * Unique ID
     */
    id: string,

    /**
     * Task to be done
     */
    task: string,

    /**
     * Status
     */
    status: TodoStatus,

    /**
     * Created date timestamp
     */
    createdAt: UnixTimestampMs,

    /**
     * Deleted date timestamp
     */
    deletedAt: UnixTimestampMs | null,
}

export type CreateTodo = Pick<Todo, "task">;
export type UpdateTodo = Pick<Todo, "task" | "status">;
