import { Todo } from "../models/Todo";
import "./TodoItem.scss";
import MatIcon from "./MatIcon";
import { MouseEventHandler } from "react";

export interface TodoItemProps {
    todo: Todo,
    onChangeState?: MouseEventHandler,
    onDelete?: MouseEventHandler
}

function TodoItem({ todo, onChangeState, onDelete }: TodoItemProps) {
    return (
        <div className="todo-item">
            <div className="description">
                {todo.task}
                <div className="misc-info">

                </div>
            </div>
            <div className="status-button-wrapper">
                <button className="todo-list-button delete-button" onClick={onDelete}>
                    <MatIcon icon="delete" />
                </button>
                <button className={`todo-list-button check-btn status-${todo.status}`} onClick={onChangeState}>
                    <MatIcon icon="check_box_outline_blank" />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;