import { generateId } from "../lib/generate-id";
import { sleep } from "../lib/sleep";
import { IDType } from "../models/IDType";
import { CreateTodo, Todo, TodoStatus, UpdateTodo } from "../models/Todo";
import { AuthLocalStorageService } from "./AuthLocalStorageService";
import { TodoService } from "./TodoService";

const ID_LENGTH = 12;
const TODO_LOCALSTORAGE_KEY = "todos";
const INITIAL_VALUE: Todo[] = [{
    id: generateId(ID_LENGTH),
    createdAt: new Date().getTime(),
    status: TodoStatus.NotStarted,
    task: "Add TODOs",
    userId: null
}];
const delay = 0;

/**
 * Service that interacts with the todos.
 */
export class TodoLocalStorageService implements TodoService {
    constructor(
        private _authService: AuthLocalStorageService
    ) {
        const currentKeys = localStorage.getItem(TODO_LOCALSTORAGE_KEY);

        if (currentKeys == null) {
            TodoLocalStorageService._saveTodos(INITIAL_VALUE);
        }
    }

    public async getTodos(): Promise<Todo[] | never> {
        delay && await sleep(delay);
        const todosJson = localStorage.getItem(TODO_LOCALSTORAGE_KEY);

        if (todosJson == null) {
            throw new Error("Failed to get TODOs.");
        }

        return JSON.parse(todosJson);
    }

    public async addTodo(todo: CreateTodo): Promise<Todo | never> {
        delay && await sleep(delay);
        let newTodo: Todo = {
            ...todo,
            createdAt: new Date().getTime(),
            id: generateId(ID_LENGTH),
            status: TodoStatus.NotStarted,
            userId: (await this._authService.getUser())?.id || null
        }

        let todos = [newTodo, ...await this.getTodos()];
        TodoLocalStorageService._saveTodos(todos);

        return newTodo;
    }

    public async updateTodo(id: IDType, updateData: UpdateTodo): Promise<Todo | never> {
        delay && await sleep(delay);
        const currentTodos = await this.getTodos();
        const todoIndex = currentTodos.findIndex(todo => todo.id === id);

        if (todoIndex == -1) {
            throw new Error("Todo not found.")
        }

        currentTodos[todoIndex] = {
            ...currentTodos[todoIndex],
            ...updateData
        };
        TodoLocalStorageService._saveTodos(currentTodos);

        return currentTodos[todoIndex];
    }

    public async deleteTodo(id: IDType): Promise<void | never> {
        delay && await sleep(delay);
        const currentTodos = await this.getTodos();
        const newTodos = currentTodos.filter(todo => todo.id !== id);
        TodoLocalStorageService._saveTodos(newTodos);
    }

    private static _saveTodos(todos: Todo[]) {
        localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(todos));
    }
}
