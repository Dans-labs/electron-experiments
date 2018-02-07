import {Tweet, TweetViewModel} from "../model/tweet"
import {TweetActionTypes} from "../constants/tweetsConstants"
import {Reducer} from "redux"
import {Lens} from "monocle-ts"

const initialState: TweetViewModel = {
    tweets: [],
    fetching: false,
    fetched: false,
}

const fetchingLens = Lens.fromProp<TweetViewModel, 'fetching'>('fetching')
const errorLens = new Lens<TweetViewModel, [boolean, string|undefined]>(
    s => [s.fetching, s.error],
    a => s => ({...s, fetching: a[0], error: a[1]})
)
const receiveLens = new Lens<TweetViewModel, [boolean, boolean, Tweet[]]>(
    s => [s.fetching, s.fetched, s.tweets],
    a => s => ({...s, fetching: a[0], fetched: a[1], user: a[2]})
)
const tweetsLens = Lens.fromProp<TweetViewModel, 'tweets'>('tweets')
const tweetTextLens = Lens.fromProp<Tweet, 'text'>('text')

export const tweets: Reducer<TweetViewModel> = (state = initialState, action) => {
    switch (action.type) {
        case TweetActionTypes.FETCH_TWEETS_PENDING: {
            return fetchingLens.set(true)(state)
        }
        case TweetActionTypes.FETCH_TWEETS_REJECTED: {
            return errorLens.set([false, action.payload])(state)
        }
        case TweetActionTypes.FETCH_TWEETS_FULFILLED: {
            return receiveLens.set([false, true, action.payload.data])(state)
        }
        case TweetActionTypes.ADD_TWEET: {
            return tweetsLens.modify(tweets => [...tweets, action.payload])(state)
        }
        case TweetActionTypes.UPDATE_TWEET: {
            const { id, text } = action.payload
            return tweetsLens.modify(tweets => tweets.map(tweet => (tweet.id === id ? tweetTextLens.set(text)(tweet) : tweet)))(state)
        }
        case TweetActionTypes.DELETE_TWEET: {
            return tweetsLens.modify(tweets => state.tweets.filter(tweet => tweet.id !== action.payload))(state)
        }
    }
    return state;
}
