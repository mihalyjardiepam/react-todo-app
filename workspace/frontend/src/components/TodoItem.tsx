import { Todo, TodoStatus } from "../models/Todo";
import "./TodoItem.scss";
import { MatIcon } from "./MatIcon";
import { memo } from "react";
import { unixTimestampIntoDate } from "../lib/unix-timestamp-into-date";

export interface TodoItemProps {
    todo: Todo;
    onChangeState?: (todo: Todo) => void;
    onDelete?: (todo: Todo) => void;
}

const StatusIconMap = {
    [TodoStatus.NotStarted]: "check_box_outline_blank",
    [TodoStatus.InProgress]: "indeterminate_check_box",
    [TodoStatus.Done]: "check_box",
};

export default memo(({ todo, onChangeState, onDelete }: TodoItemProps) => {
    const { createdAt, id, status, task } = todo;

    return (
        <div className={`todo-item ${status == TodoStatus.Done ? "complete" : ""}`}>
            <div className="description">
                {task}
                <div className="misc-info">Created at: {unixTimestampIntoDate(createdAt)}</div>
            </div>
            <div className="status-button-wrapper">
                <button className="todo-list-button delete-button" onClick={() => onDelete?.(todo)}>
                    <MatIcon icon="delete" />
                </button>
                <button className={`todo-list-button check-btn status-${status}`} onClick={() => onChangeState?.(todo)}>
                    <MatIcon icon={StatusIconMap[status]} />
                </button>
            </div>
        </div>
    );
});
