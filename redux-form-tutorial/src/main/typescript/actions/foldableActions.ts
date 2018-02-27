import {ReduxAction} from "../util"

export const register: (id: string, open: boolean) => ReduxAction<{id, open}> = (id, open) => ({
    type: "REGISTER_FOLDABLE",
    payload: {id, open}
})

export const unregister: (id: string) => ReduxAction<string> = id => ({
    type: "UNREGISTER_FOLDABLE",
    payload: id
})

export const toggle: (id: string) => ReduxAction<string> = id => ({
    type: "TOGGLE_FOLDABLE",
    payload: id
})

