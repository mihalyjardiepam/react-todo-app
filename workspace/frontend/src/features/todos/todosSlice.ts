import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTodo, IDType, Todo, UpdateTodo } from "../../models/Todo";
import { ThunkExtra } from "../../store";

const createAppSlice = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
});

export const todoSlice = createAppSlice({
    name: "todos",
    initialState: {
        todos: <Todo[]>[]
    },
    reducers: (create => ({
        getTodos: create.asyncThunk<Todo[], void, ThunkExtra>(
            async (_, thunkApi) => {
                return await thunkApi.extra.todoService.getTodos();
            },
        ),
        addTodo: create.asyncThunk<Todo, CreateTodo, ThunkExtra>(
            async (todo, thunkApi) => {
                return await thunkApi.extra.todoService.addTodo(todo);
            }
        ),
        updateTodo: create.asyncThunk<Todo, { todo: UpdateTodo, id: IDType }, ThunkExtra>(
            async ({ todo, id }, thunkApi) => {
                return await thunkApi.extra.todoService.updateTodo(id, todo);
            }
        ),
        upsertTodo: create.reducer((state, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);

            if (index !== -1) {
                state.todos.unshift(action.payload);
            } else {
                state.todos[index] = action.payload;
            }
        }),
        deleteTodo: create.asyncThunk<IDType, IDType, ThunkExtra>(
            async (id, thunkApi) => {
                await thunkApi.extra.todoService.deleteTodo(id);
                return id;
            }
        )
    })),
    extraReducers: (builder) => {
        builder
            .addCase(todoSlice.actions.getTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(todoSlice.actions.addTodo.fulfilled, (state, action) => {
                state.todos.unshift(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);

                state.todos[index] = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    }
});

export const { addTodo, deleteTodo, updateTodo, getTodos, upsertTodo } = todoSlice.actions;
