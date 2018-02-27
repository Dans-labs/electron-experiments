export interface User {
    id: string
    name: string
}

export type Users = User[]
export type OpenedCards = { [id: string]: boolean }

export interface AppState {
    users: Users
    openedCards: OpenedCards
}
