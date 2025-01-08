import { Todo } from "../models/Todo";
import TodoStatusButton from "./TodoStatusButton";
import "./TodoItem.scss";

function TodoItem({todo}: { todo: Todo }) {
    return (
        <div className="todo-item">
            <div className="description">
                { todo.task }
                <div className="misc-info">
                    
                </div>
            </div>
            <div className="status-button-wrapper">
                <TodoStatusButton todo={todo} onClick={() => {}} />
            </div>
        </div>
    );
}

export default TodoItem;