import {ReduxAction} from "../util"

export const addUser: (name: string) => ReduxAction<string> = name => ({
    type: "ADD_USER",
    payload: name,
})

export const removeUser: (id: string) => ReduxAction<string> = id => ({
    type: "REMOVE_USER",
    payload: id,
})
