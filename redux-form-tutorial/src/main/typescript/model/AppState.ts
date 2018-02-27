export interface User {
    id: string
    name: string
}
export type Users = User[]

export interface AppState {
    users: Users
    openedCards: string[] // TODO use a dictionary instead: [id] -> true|false
}
