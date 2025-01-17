import { User } from "../../models/User";
import { PayloadActionCreator } from "../../lib/reduxTypeExt";
import { Action, ActionCreator } from "redux";

export enum AuthActionTypes {
    UserChanged = "auth/userChanged",
    Logout = "auth/logout"
}

export const authUserChangedAction: PayloadActionCreator<[User | null]> = (user) => {
    return {
        type: AuthActionTypes.UserChanged,
        payload: user
    }
}

export const logoutAction: ActionCreator<Action> = () => {
    return {
        type: AuthActionTypes.Logout
    }
}
