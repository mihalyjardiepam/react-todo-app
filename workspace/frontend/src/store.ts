import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./features/todos/todosSlice";
import { TodoServiceFactory } from "./services/TodoServiceFactory";
import { TodoService } from "./services/TodoService";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                todoService: TodoServiceFactory.getTodoService()
            }
        }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkExtra = {
    extra: {
        todoService: TodoService
    }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
