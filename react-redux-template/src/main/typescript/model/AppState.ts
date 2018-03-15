export interface Counter {
    value: number
}

export const emptyCounter: Counter = {
    value: 0
}

export interface AppState {
    counter: Counter
}

export const empty: AppState = {
    counter: emptyCounter
}
