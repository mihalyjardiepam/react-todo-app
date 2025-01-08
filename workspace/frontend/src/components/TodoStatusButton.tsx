import { Todo } from "../models/Todo";
import "./TodoStatusButton.scss";

interface TodoStatusButtonProps {
    todo: Pick<Todo, "status">;
    onClick: () => void;
}
// TODO 
// DONE
// WIP
function TodoStatusButton({ todo, onClick }: TodoStatusButtonProps) {
    const { status } = todo;

    return (
        <button
            onClick={onClick}
            className={`status-button`}>
            <div className={`indicator status-${status}`}></div>
        </button>
    );
}

export default TodoStatusButton;
