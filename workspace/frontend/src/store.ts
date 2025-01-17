import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { todoReducer } from "./features/todos/todoReducer";
import { thunk } from "redux-thunk";
import { authReducer } from "./features/auth/authReducer";

const reducers = combineReducers({
    todo: todoReducer,
    auth: authReducer
});

// @ts-ignore
export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store["getState"]>;
export type GetStateFn = typeof store["getState"];
