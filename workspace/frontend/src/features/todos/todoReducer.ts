import { Dispatch, UnknownAction } from "redux";
import { CreateTodo, Todo, UpdateTodo } from "../../models/Todo";
import { TodoServiceFactory } from "../../services/TodoServiceFactory";
import { TodoActionTypes, todoAdded, todoDeleted, todosLoaded, todoUpdated } from "./todoActions";
import { IDType } from "../../models/IDType";

const service = TodoServiceFactory.getTodoService();

const initialState = {
    todos: <Todo[]>[]
};

export function todoReducer(state = initialState, action: UnknownAction) {
    switch (action.type) {
        case TodoActionTypes.TodoAdded:
            return { ...state, todos: [action.payload, ...state.todos] };

        case TodoActionTypes.TodosLoaded:
            return { ...state, todos: action.payload };

        case TodoActionTypes.TodoUpdated:
            const updatedTodo = action.payload as Todo;

            const index = state.todos.findIndex(todo => todo.id == updatedTodo.id);
            if (index == -1) {
                state.todos.push(updatedTodo)
            } else {
                state.todos[index] = updatedTodo;
            }
            return { ...state, todos: [...state.todos] }

        case TodoActionTypes.TodoDeleted:
            const deletedTodoId = action.payload as IDType;
            state.todos = state.todos.filter(todo => todo.id !== deletedTodoId);
            return { ...state, todos: [...state.todos] }

        default:
            return state
    }
}

export function fetchTodos() {
    return async (dispatch: Dispatch) => {
        const data = await service.getTodos();
        dispatch(todosLoaded(data));
    };
}

export function addTodo(todo: CreateTodo) {
    return async (dispatch: Dispatch) => {
        const data = await service.addTodo(todo);
        dispatch(todoAdded(data))
    };
}

export function updateTodo(todoId: IDType, updateProps: UpdateTodo) {
    return async (dispatch: Dispatch) => {
        const data = await service.updateTodo(todoId, updateProps);
        dispatch(todoUpdated(data));
    };
}

export function deleteTodo(todoId: IDType) {
    return async (dispatch: Dispatch) => {
        await service.deleteTodo(todoId);
        dispatch(todoDeleted(todoId));
    };
}
