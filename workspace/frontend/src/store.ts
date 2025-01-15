import { Action, configureStore, createListenerMiddleware, Dispatch, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, todoSlice } from "./features/todos/todosSlice";
import { TodoServiceFactory } from "./services/TodoServiceFactory";
import { TodoService } from "./services/TodoService";
import { useDispatch, useSelector } from "react-redux";
import { AuthLocalStorageService } from "./services/AuthLocalStorageService";
import { AuthService } from "./services/AuthService";
import { authSlice, login } from "./features/auth/authSlice";
import { enqueueSnackbar } from "notistack";

const errorListener = createListenerMiddleware<RootState>();

errorListener.startListening({
    effect: (action, _) => {
        if (isRejected(action)) {
            enqueueSnackbar({
                variant: "error",
                message: action.error.message
            })
        }
    },
    predicate: (action) => {
        return action.type.includes("rejected")
    },
});

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
