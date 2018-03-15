import { CountConstants } from "../constants/countConstants"
import { ReduxAction } from "../lib/redux"

export const increment: () => ReduxAction<number> = () => ({
    type: CountConstants.INCREMENT,
    payload: 1,
})

export const decrement: () => ReduxAction<number> = () => ({
    type: CountConstants.DECREMENT,
    payload: 1,
})
