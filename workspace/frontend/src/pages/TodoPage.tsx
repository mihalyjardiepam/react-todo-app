import { useContext, useEffect, useState } from "react";
import { TodoServiceContext } from "../context/TodoServiceContext";
import "./TodoPage.scss";
import { Todo } from "../models/Todo";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";

function TodoPage() {
    const todoService = useContext(TodoServiceContext);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (!todoService) {
            return;
        }

        (async () => {
            setTodos(await todoService.getTodos());
        })();
    }, []);

    async function addTodo(task: string) {
        console.log(task);
    }

    return (
        <div className="todo-pager-wrapper">
            <div className="todo-page">
                <div className="add-todo-item">
                    <AddTodo onAdd={addTodo} />
                </div>
                <div className="todo-list">
                    {todos.map(todo => (<TodoItem todo={todo} key={todo.id} />))}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
