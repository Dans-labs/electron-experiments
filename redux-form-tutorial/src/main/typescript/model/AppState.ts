export interface User {
    id: string
    name: string
}
export type Users = User[]

export interface AppState {
    users: Users
}
