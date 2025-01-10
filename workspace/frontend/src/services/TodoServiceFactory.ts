import { TodoLocalStorageService } from "./TodoLocalStorageService";
import { TodoService } from "./TodoService";

export class TodoServiceFactory {
    public static getTodoService(): TodoService {
        return new TodoLocalStorageService();
    }
}
