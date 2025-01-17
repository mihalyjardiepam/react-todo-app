import { Dispatch, UnknownAction } from "redux";
import { User } from "../../models/User";
import { AuthLocalStorageService } from "../../services/AuthLocalStorageService";
import { AuthActionTypes, authUserChangedAction, logoutAction } from "./authActions";
import { PayloadAction } from "../../lib/reduxTypeExt";
import { AuthCredentials } from "../../models/Auth";

const service = new AuthLocalStorageService();

const initialState = {
    user: <User | null>null
}

export function authReducer(state = initialState, action: UnknownAction) {
    switch (action.type) {
        case AuthActionTypes.UserChanged:
            const payloadAction = action as PayloadAction<User | null>;
            return {
                ...state,
                user: payloadAction.payload
            };

        case AuthActionTypes.Logout:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}

export function loadUser() {
    return async (dispatch: Dispatch) => {
        const user = await service.getUser();
        dispatch(authUserChangedAction(user));
    }
}

export function login(credentials: AuthCredentials) {
    return async (dispatch: Dispatch) => {
        const result = await service.login(credentials);
        dispatch(authUserChangedAction(result));
        return result;
    }
}

export function signup(credentials: AuthCredentials) {
    return async (dispatch: Dispatch) => {
        const result = await service.signup(credentials);
        dispatch(authUserChangedAction(result));
        return result;
    }
}

export function logout() {
    return async (dispatch: Dispatch) => {
        await service.logout();
        dispatch(logoutAction());
    }
}
