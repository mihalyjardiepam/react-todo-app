import { CreateTodo, Todo, UpdateTodo } from "../models/Todo";

export interface TodoService {
    getTodos(): Promise<Todo[] | never>;
    addTodo(todo: CreateTodo): Promise<Todo | never>;
    updateTodo(id: string, todo: UpdateTodo): Promise<Todo | never>;
    deleteTodo(id: string): Promise<void | never>;
}
