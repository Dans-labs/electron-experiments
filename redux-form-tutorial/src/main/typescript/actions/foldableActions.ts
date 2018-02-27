import {ReduxAction} from "../util"

export const register: (id: string, open: boolean) => ReduxAction<[string, boolean]> = (id, open) => ({
    type: "REGISTER_FOLDABLE",
    payload: [id, open]
})

export const toggle: (id: string) => ReduxAction<string> = id => ({
    type: "TOGGLE_FOLDABLE",
    payload: id
})

