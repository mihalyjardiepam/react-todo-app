import { CreateTodo, IDType, Todo, UpdateTodo } from "../models/Todo";

export interface TodoService {
    getTodos(): Promise<Todo[] | never>;
    addTodo(todo: CreateTodo): Promise<Todo | never>;
    updateTodo(id: IDType, todo: UpdateTodo): Promise<Todo | never>;
    deleteTodo(id: IDType): Promise<void | never>;
}
