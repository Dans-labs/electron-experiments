import * as UserConstants from "../constants/userConstants.jsx";

export function fetchUser() {
    return {
        type: UserConstants.FETCH_USER_FULFILLED,
        payload: {
            name: "Will",
            age: 35,
        }
    }
}

export function setUserName(name) {
    return {
        type: UserConstants.SET_USER_NAME,
        payload: name,
    }
}

export function setUserAge(age) {
    return {
        type: UserConstants.SET_USER_AGE,
        payload: age,
    }
}
