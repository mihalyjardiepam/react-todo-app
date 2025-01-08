import { generateId } from "../lib/generate-id";
import { CreateTodo, Todo, TodoStatus, UpdateTodo } from "../models/Todo";
import { TodoService } from "./TodoService";

const ID_LENGTH = 12;
const TODO_LOCALSTORAGE_KEY = "todos";
const INITIAL_VALUE: Todo[] = [{
    id: generateId(ID_LENGTH),
    createdAt: new Date().getTime(),
    status: TodoStatus.NotStarted,
    task: "Add TODOs"
}];

/**
 * Service that interacts with the todos.
 */
export class TodoLocalStorageService implements TodoService {
    constructor() {
        const currentKeys = localStorage.getItem(TODO_LOCALSTORAGE_KEY);

        if (currentKeys == null) {
            localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(INITIAL_VALUE))
        }
    }

    public async getTodos(): Promise<Todo[] | never> {
        const todosJson = localStorage.getItem(TODO_LOCALSTORAGE_KEY);

        if (todosJson == null) {
            throw new Error("Failed to get TODOs.");
        }

        return JSON.parse(todosJson);
    }

    public async addTodo(todo: CreateTodo): Promise<Todo | never> {
        let newTodo: Todo = {
            ...todo,
            createdAt: new Date().getTime(),
            id: generateId(ID_LENGTH),
            status: TodoStatus.NotStarted
        }
        
        let todos = [newTodo, ...await this.getTodos()];
        localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(todos));

        return newTodo;
    }

    public async updateTodo(id: string, updateData: UpdateTodo): Promise<Todo | never> {
        const currentTodos = await this.getTodos();
        const todoIndex = currentTodos.findIndex(todo => todo.id === id);

        if (todoIndex == -1) {
            throw new Error("Todo not found.")
        }

        currentTodos[todoIndex] = {
            ...currentTodos[todoIndex],
            ...updateData
        };
        localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(currentTodos));

        return currentTodos[todoIndex];
    }

    public async deleteTodo(id: string): Promise<void | never> {
        const currentTodos = await this.getTodos();
        const newTodos = currentTodos.filter(todo => todo.id !== id);
        localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(newTodos));
    }
}
