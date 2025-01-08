import { createContext, PropsWithChildren } from "react";
import { TodoLocalStorageService } from "../services/TodoLocalStorageService";
import { TodoService } from "../services/TodoService";

export const TodoServiceContext = createContext<TodoService | undefined>(undefined);

function TodoServiceProvider({ children }: PropsWithChildren) {
    return (
        <TodoServiceContext.Provider value={new TodoLocalStorageService()}>
            {children}
        </TodoServiceContext.Provider>
    );
}

export default TodoServiceProvider;
