import { IDType } from "./IDType";
import { UnixTimestampMs } from "./UnixTimestampMs";

export enum TodoStatus {
    NotStarted,
    InProgress,
    Done,
}

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

    /**
     * Creator User ID
     */
    userId: IDType | null;
}

export type CreateTodo = Pick<Todo, "task">;
export type UpdateTodo = Pick<Todo, "task" | "status">;
