export interface Tweet {
    id: string
    text: string
}

export interface TweetViewModel {
    tweets: Tweet[]
    fetching: boolean
    fetched: boolean
    error?: string
}
