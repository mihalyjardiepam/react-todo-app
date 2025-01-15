import "./TodoPage.scss";
import TodoItem from "../../components/TodoItem";
import AddTodo from "../../components/AddTodo";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../../features/todos/todosSlice";
import { Todo, TodoStatus } from "../../models/Todo";
import { useCallback, useEffect } from "react";

function TodoPage() {
    const { todos } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodos());
    }, []);

    const changeTodoState = useCallback(
        async (todo: Todo) => {
            const newStatus = (todo.status + 1) % (TodoStatus.Done + 1);
            dispatch(
                updateTodo({
                    id: todo.id,
                    todo: {
                        status: newStatus,
                        task: todo.task,
                    },
                })
            );
        },
        [dispatch]
    );

    const onDeleteTodo = useCallback(
        (todo: Todo) => {
            dispatch(deleteTodo(todo.id));
        },
        [dispatch]
    );

    return (
        <div className="todo-page-wrapper">
            <div className="todo-page">
                <AddTodo onAdd={(task) => dispatch(addTodo({ task }))} />
                <div className="todo-list-header">TODO List:</div>
                <div className="todo-list">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                todo={todo}
                                key={todo.id}
                                onChangeState={changeTodoState}
                                onDelete={onDeleteTodo}
                            />
                        ))
                    ) : (
                        <div className="no-todos">You have no TODOs</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
