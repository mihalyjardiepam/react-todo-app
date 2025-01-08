import { SyntheticEvent, useRef } from "react";

interface AddTodoProps {
    onAdd: (task: string) => any; // any: Don't care about return type
}

function AddTodo({ onAdd }: AddTodoProps) {
    const taskInputRef = useRef<HTMLInputElement | null>(null);

    function submitTodo(evt: SyntheticEvent) {
        evt.preventDefault();
        if (!taskInputRef.current) {
            return;
        }

        onAdd(taskInputRef.current.value);
        taskInputRef.current.value = "";
    }

    return (
        <div className="add-todo-wrapper">
            <form onSubmit={submitTodo}>
                <input ref={taskInputRef} type="text" name="todo-input" placeholder="task description..." />
                <button onClick={submitTodo}>Add Todo</button>
            </form>
        </div>
    );
}

export default AddTodo;