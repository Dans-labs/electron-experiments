import {UserViewModel} from "./user"
import {TweetViewModel} from "./tweet"

export interface AppState {
    user: UserViewModel
    tweets: TweetViewModel
}
