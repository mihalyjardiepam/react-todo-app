import { IDType } from "../../models/IDType"
import { Todo } from "../../models/Todo"

export const todoAdded = (todo: Todo) => {
    return {
        type: "todos/todoAdded",
        payload: todo
    }
}

export const todosLoaded = (todos: Todo[]) => {
    return {
        type: "todos/todosLoaded",
        payload: todos
    }
}

export const todoUpdated = (todo: Todo) => {
    return {
        type: "todos/todoUpdated",
        payload: todo
    }
}

export const todoDeleted = (todoId: IDType) => {
    return {
        type: "todos/todoDeleted",
        payload: todoId
    }
}

export const fetchTodos = () => {
    return {
        type: "todos/fetchTodos"
    }
}
