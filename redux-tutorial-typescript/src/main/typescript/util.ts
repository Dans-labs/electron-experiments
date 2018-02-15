import {AppState} from "./model/app"
import {Action, Dispatch as ReduxDispatch} from "redux"

export type Dispatch = ReduxDispatch<AppState>

export interface ReduxAction<T> extends Action {
    payload: T
}

const urls: { [key: string]: { api: string } } = {
    "production": {
        "api": "",
    },
    "integration": {
        "api": "",
    },
    "development": {
        "api": "http://localhost:3004",
    },
}

export const baseURL = () => {
    let url = urls[process.env.NODE_ENV]
    console.log(url)
    const res = url.api

    console.log(res)
    return res
}
