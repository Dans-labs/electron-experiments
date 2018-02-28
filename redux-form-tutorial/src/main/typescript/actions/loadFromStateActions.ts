import {Dispatch, ReduxAction} from "../util"
import {FormData} from "../components/LoadFromStateForm"

export const storeData: (data: FormData) => ReduxAction<FormData> = data => ({
    type: "STORE_FORM_DATA",
    payload: data,
})

export const loadDataFromServer: (id: string) => (dispatch: Dispatch) => Promise<ReduxAction<FormData>> = id => async dispatch => {
    // simulate web request
    await new Promise(resolve => setTimeout(resolve, 500))

    const receivedData: FormData = {
        firstName: `Jim_${id}`,
        lastName: "Jones",
        age: 25
    }

    return dispatch(receiveInitialData(receivedData))
}

const receiveInitialData: (data: FormData) => ReduxAction<FormData> = data => ({
    type: "RECEIVE_INITIAL_DATA",
    payload: data,
})
