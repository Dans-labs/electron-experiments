import { Action } from "redux"

export interface ReduxAction<T> extends Action {
    payload: T | (() => T)
}
