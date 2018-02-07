import {User} from "../model/user"
import {UserActionTypes} from "../constants/userConstants"
import {ReduxAction} from "../util"

const fetchUser: () => ReduxAction<User> = () => ({
    type: UserActionTypes.FETCH_USER_FULFILLED,
    payload: ({name: "Richard", age: 25}),
})

const setUserName: (name: string) => ReduxAction<string> = name => ({
    type: UserActionTypes.SET_USER_NAME,
    payload: name,
})

const setUserAge: (age: number) => ReduxAction<number> = age => ({
    type: UserActionTypes.SET_USER_AGE,
    payload: age,
})

export {
    fetchUser,
    setUserName,
    setUserAge
}
