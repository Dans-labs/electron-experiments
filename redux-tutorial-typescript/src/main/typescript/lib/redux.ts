import {AppState} from "../model/app"
import {Action, Dispatch as ReduxDispatch} from "redux"

export type Dispatch = ReduxDispatch<AppState>

export interface ReduxAction<T> extends Action {
    payload: T
}
