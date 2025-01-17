import { IDType } from "../../models/IDType"
import { Todo } from "../../models/Todo"

export enum TodoActionTypes {
    TodoAdded = "todos/todoAdded",
    TodosLoaded = "todos/todosLoaded",
    TodoUpdated = "todos/todoUpdated",
    TodoDeleted = "todos/todoDeleted",
}

export const todoAdded = (todo: Todo) => {
    return {
        type: TodoActionTypes.TodoAdded,
        payload: todo
    }
}

export const todosLoaded = (todos: Todo[]) => {
    return {
        type: TodoActionTypes.TodosLoaded,
        payload: todos
    }
}

export const todoUpdated = (todo: Todo) => {
    return {
        type: TodoActionTypes.TodoUpdated,
        payload: todo
    }
}

export const todoDeleted = (todoId: IDType) => {
    return {
        type: TodoActionTypes.TodoDeleted,
        payload: todoId
    }
}
