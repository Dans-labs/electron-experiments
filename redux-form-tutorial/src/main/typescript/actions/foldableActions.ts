import {ReduxAction} from "../util"

export const toggle: (id: string) => ReduxAction<string> = id => ({
    type: "TOGGLE_FOLDABLE",
    payload: id
})

