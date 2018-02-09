export interface User {
    name: string
    age: number
}

export interface UserViewModel {
    user: User
    fetching: boolean
    fetched: boolean
    error?: string
}
