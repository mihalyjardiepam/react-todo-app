import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./features/todos/todosSlice";
import { TodoServiceFactory } from "./services/TodoServiceFactory";
import { TodoService } from "./services/TodoService";
import { useDispatch, useSelector } from "react-redux";
import { AuthLocalStorageService } from "./services/AuthLocalStorageService";
import { AuthService } from "./services/AuthService";
import { authSlice } from "./features/auth/authSlice";
import { errorListener } from "./effects/errorSnackbar";

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        let middleware = getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    todoService: TodoServiceFactory.getTodoService(),
                    authService: new AuthLocalStorageService()
                }
            }
        });

        middleware.push(errorListener.middleware);

        return middleware;
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkExtra = {
    extra: {
        todoService: TodoService,
        authService: AuthService,
    }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
