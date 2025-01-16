import "./TodoPage.scss";
import TodoItem from "../../components/TodoItem";
import AddTodo from "../../components/AddTodo";
import { useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
    addTodo as addTodoThunk,
    fetchTodos as fetchTodosThunk,
    deleteTodo as deleteTodoThunk,
    updateTodo as updateTodoThunk,
} from "../../features/todos/todoReducer";
import { Todo, TodoStatus } from "../../models/Todo";
import { AppState } from "../../store";
import { useAsyncDispatch } from "../../hooks/useAsyncDispatch";

interface TodoPageProps {
    todos: Todo[];
}

const TodoPage = ({ todos }: TodoPageProps) => {
    const dispatch = useDispatch();
    const [fetchTodos, isLoadingTodos] = useAsyncDispatch(dispatch, fetchTodosThunk);
    const [addTodo, isAddingTodos] = useAsyncDispatch(dispatch, addTodoThunk);
    const [updateTodo, isUpdatingTodo] = useAsyncDispatch(dispatch, updateTodoThunk);
    const [deleteTodo, isDeletingTodo] = useAsyncDispatch(dispatch, deleteTodoThunk);

    useEffect(() => {
        fetchTodos().then(() => {
            console.log("done!");
        });
    }, [dispatch]);

    const onAddTodo = useCallback(
        (task: string) => {
            addTodo({
                task,
            });
        },
        [dispatch]
    );

    const onChangeTodoState = useCallback(
        (todo: Todo) => {
            const nextStatus = (todo.status + 1) % (TodoStatus.Done + 1);
            updateTodo(todo.id, {
                status: nextStatus,
                task: todo.task,
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

    return (
        <div className="todo-page-wrapper">
            <div className="todo-page">
                <AddTodo onAdd={onAddTodo} disabled={isAddingTodos} />
                <div className="todo-list-header">TODO List:</div>
                <div className="todo-list">
                    {isLoadingTodos ? (
                        <p className="loading">Loading...</p>
                    ) : todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                disabled={isAddingTodos || isUpdatingTodo || isDeletingTodo}
                                todo={todo}
                                key={todo.id}
                                onChangeState={onChangeTodoState}
                                onDelete={onDeleteTodo}
                            />
                        ))
                    ) : (
                        <div className="no-todos">You have no TODOs</div>
                    )}
                    {}
                </div>
            </div>
        </div>
    );
};

const Component = connect((state: AppState) => {
    return { todos: state.todo!.todos };
})(TodoPage);

export default Component;
