import {combineReducers} from "redux"
import {reducer as formReducer} from 'redux-form'
import {usersReducer} from "./submitReducer"

export default combineReducers({
    form: formReducer.plugin({
        demo: (state, action) => {
            switch (action.type) {
                case "@@redux-form/CHANGE":
                    const fieldName = action.meta.field
                    return {
                        ...state,
                        fields: {
                            ...state.fields,
                            [fieldName]: {
                                ...state.fields[fieldName],
                                changed: true,
                            },
                        },
                    }
            }
            return state
        },
    }),
    users: usersReducer,
})
