import { UnixTimestampMs } from "./UnixTimestampMs";

export enum TodoStatus {
    NotStarted,
    InProgress,
    Done,
}

export type IDType = string;

/**
 * Represents a TODO
 */
export interface Todo {
    /**
     * Unique ID
     */
    id: IDType,

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
}

export type CreateTodo = Pick<Todo, "task">;
export type UpdateTodo = Pick<Todo, "task" | "status">;
