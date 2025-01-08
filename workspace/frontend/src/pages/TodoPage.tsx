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
        <div className="todo-page-wrapper">
            <div className="todo-page">
                <AddTodo onAdd={addTodo} />
                <div className="todo-list-header">TODO List:</div>
                <div className="todo-list">
                    {todos.map(todo => (<TodoItem todo={todo} key={todo.id} />))}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
