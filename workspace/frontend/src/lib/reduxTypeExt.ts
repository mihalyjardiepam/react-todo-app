import { Action, ActionCreator } from "redux";

export interface PayloadAction<T> extends Action {
    payload: T,
    [key: string]: any,
}

export type PayloadActionCreator<P extends any[], A = P[0]> =
    ActionCreator<PayloadAction<A>, P>;
