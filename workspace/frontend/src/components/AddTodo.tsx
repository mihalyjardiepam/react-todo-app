import { useRef } from "react";
import "./AddTodo.scss";

interface AddTodoProps {
    onAdd: (task: string) => any; // any: Don't care about return type
}

function AddTodo({ onAdd }: AddTodoProps) {
    const taskInputRef = useRef<HTMLInputElement | null>(null);

    async function addTodo() {
        if (!taskInputRef.current) {
            return;
        }

        onAdd(taskInputRef.current.value);
        taskInputRef.current.value = "";
    }

    return (
        <div className="add-todo">
            <form action={addTodo}>
                <input
                    className="input"
                    required
                    ref={taskInputRef}
                    type="text"
                    autoComplete="off"
                    name="todo-input"
                    placeholder="task description..."
                />
                <button type="submit" className="btn btn-primary">
                    Add New Todo
                </button>
            </form>
        </div>
    );
}

export default AddTodo;
