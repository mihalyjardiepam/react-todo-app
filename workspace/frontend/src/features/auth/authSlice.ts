import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { AuthCredentials } from "../../models/Auth";
import { ThunkExtra } from "../../store";

const createAppSlice = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
});

export const authSlice = createAppSlice({
    name: "auth",
    initialState: {
        user: <User | null>null
    },
    reducers: (create => ({
        login: create.asyncThunk<User, AuthCredentials, ThunkExtra>(
            async (credentials, thunkApi) => {
                return await thunkApi.extra.authService.login(credentials);
            }
        ),
        logout: create.asyncThunk<void, void, ThunkExtra>(
            async (_, thunkApi) => {
                return await thunkApi.extra.authService.logout();
            }
        ),
        signup: create.asyncThunk<User, AuthCredentials, ThunkExtra>(
            async (credentials, thunkApi) => {
                return await thunkApi.extra.authService.signup(credentials);
            }
        ),
        fetchUser: create.asyncThunk<User | null, void, ThunkExtra>(
            async (_, thunkApi) => {
                return await thunkApi.extra.authService.getUser();
            }
        ),
    })),
    extraReducers: (builder) => {
        builder
            .addCase(
                authSlice.actions.login.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            )
            .addCase(
                authSlice.actions.signup.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            )
            .addCase(
                authSlice.actions.logout.fulfilled, (state, _) => {
                    state.user = null;
                }
            )
            .addCase(
                authSlice.actions.fetchUser.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            )
    }
});

export const { fetchUser, login, logout, signup } = authSlice.actions;
