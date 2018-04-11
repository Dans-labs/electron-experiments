import { FormData } from "../components/LoadFromStateForm"

export interface User {
    id: string
    name: string
}

export type Users = User[]
export type OpenedCards = { [id: string]: boolean }

export interface Person {
    name: string
    age: number
}
export type Persons = Person[]

export interface AppState {
    users: Users
    openedCards: OpenedCards
    persons: Persons
    initialState: FormData
}
