import { useContext, useEffect, useState } from "react";
import { TodoServiceContext } from "../context/TodoServiceContext";
import "./TodoPage.scss";
import { Todo } from "../models/Todo";

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

    return <>
        <p>
            {JSON.stringify(todoService)}
        </p>
    </>;
}

export default TodoPage;
