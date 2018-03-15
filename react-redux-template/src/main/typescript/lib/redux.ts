import { AppState } from "../model/AppState"
import { Action, AnyAction, Dispatch as ReduxDispatch, Middleware, MiddlewareAPI } from "redux"

export type Dispatch = ReduxDispatch<AppState>

export interface ReduxAction<T> extends Action {
    payload: T | (() => T)
}
