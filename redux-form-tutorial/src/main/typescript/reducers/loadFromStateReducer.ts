import {Reducer} from "redux"
import {Persons} from "../model/AppState"
import {FormData} from "../components/LoadFromStateForm"

export const loadFromStateReducer: Reducer<Persons> = (state = [], action) => {
    switch (action.type) {
        case "STORE_FORM_DATA": {
            const data = action.payload
            return [...state, {
                name: `${data.firstName} ${data.lastName}`,
                age: data.age
            }]
        }
    }
    return state
}

export const initializeForm: Reducer<FormData> = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_INITIAL_DATA":
            return action.payload
    }
    return state
}
