import { useContext, useEffect, useState } from "react";
import { TodoServiceContext } from "../context/TodoServiceProvider";
import "./TodoPage.scss";
import { Todo, TodoStatus } from "../models/Todo";
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
        if (!todoService) {
            return;
        }

        await todoService.addTodo({
            task
        });

        setTodos(await todoService.getTodos());
    }

    async function changeState(todo: Todo) {
        if (!todoService) {
            return;
        }

        const newStatus = (todo.status + 1) % (TodoStatus.Done + 1);
        await todoService.updateTodo(todo.id, {
            status: newStatus,
            task: todo.task
        });

        setTodos(await todoService.getTodos());
    }

    async function deleteTodo(todo: Todo) {
        if (!todoService) {
            return;
        }

        await todoService.deleteTodo(todo.id);
        setTodos(await todoService.getTodos());
    }

    return (
        <div className="todo-page-wrapper">
            <div className="todo-page">
                <AddTodo onAdd={addTodo} />
                <div className="todo-list-header">TODO List:</div>
                <div className="todo-list">
                    {todos.length > 0 ? todos.map(todo => (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            onChangeState={() => changeState(todo)}
                            onDelete={() => deleteTodo(todo)} />
                    )) : (
                        <div className="no-todos">
                            You have no TODOs
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
