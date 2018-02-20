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
                case "@@redux-form/TOUCH":
                    const fields = action.meta.fields.map((fieldName: string) => ({
                        [fieldName]: {
                            ...state.fields[fieldName],
                            changed: true,
                        },
                    }))

                    return {
                        ...state,
                        fields: {
                            ...Object.assign(state.fields, ...fields),
                        },
                    }
            }
            return state
        },
    }),
    users: usersReducer,
})
