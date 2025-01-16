import "./TodoPage.scss";
import TodoItem from "../../components/TodoItem";
import AddTodo from "../../components/AddTodo";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    addTodo as addTodoAction,
    deleteTodo as deleteTodoAction,
    getTodos as getTodosAction,
    updateTodo as updateTodoAction,
} from "../../features/todos/todosSlice";
import { Todo, TodoStatus } from "../../models/Todo";
import { useCallback, useEffect } from "react";
import { useAsyncDispatcher } from "../../hooks/useAsyncDispatcher";

function TodoPage() {
    const { todos } = useAppSelector((state) => state.todos);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [getTodos, isLoadingTodos] = useAsyncDispatcher(dispatch, getTodosAction);
    const [addTodo, isAddingTodo] = useAsyncDispatcher(dispatch, addTodoAction);
    const [updateTodo, isUpdatingTodo] = useAsyncDispatcher(dispatch, updateTodoAction);
    const [deleteTodo, isDeletingTodo] = useAsyncDispatcher(dispatch, deleteTodoAction);

    useEffect(() => {
        getTodos();
    }, []);

    const changeTodoState = useCallback(
        async (todo: Todo) => {
            const newStatus = (todo.status + 1) % (TodoStatus.Done + 1);
            updateTodo({
                id: todo.id,
                todo: {
                    status: newStatus,
                    task: todo.task,
                },
            });
        },
        [dispatch]
    );

    const onDeleteTodo = useCallback(
        (todo: Todo) => {
            deleteTodo(todo.id);
        },
        [dispatch]
    );

    const onAddTodo = useCallback((task: string) => {
        addTodo({
            task,
        });
    }, []);

    return (
        <div className="todo-page-wrapper">
            <div className="todo-page">
                <AddTodo onAdd={onAddTodo} disabled={isAddingTodo} />
                <div className="todo-list-header">TODO List:</div>
                {isLoadingTodos ? (
                    <p className="loading">Loading TODOs</p>
                ) : (
                    <div className="todo-list">
                        {todos.filter((todo) => todo.userId == user?.id).length > 0 ? (
                            todos.map((todo) => (
                                <TodoItem
                                    disabled={isUpdatingTodo || isDeletingTodo}
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
                )}
            </div>
        </div>
    );
}

export default TodoPage;
