import {TweetViewModel} from "../model/tweet"
import {TweetActionTypes} from "../constants/tweetsConstants"
import {Reducer} from "redux"

const initalState: TweetViewModel = {
    tweets: [],
    fetching: false,
    fetched: false,
}

export const tweets: Reducer<TweetViewModel> = (state: TweetViewModel = initalState, action) => {
    switch (action.type) {
        case TweetActionTypes.FETCH_TWEETS_PENDING: {
            return {...state, fetching: true}
        }
        case TweetActionTypes.FETCH_TWEETS_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case TweetActionTypes.FETCH_TWEETS_FULFILLED: {
            return {...state, fetching: false, fetched: true, tweets: action.payload.data}
        }
        case TweetActionTypes.ADD_TWEET: {
            return {...state, tweets: [...state.tweets, action.payload]}
        }
        case TweetActionTypes.UPDATE_TWEET: {
            const { id } = action.payload
            const newTweets = [...state.tweets]
            const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
            newTweets[tweetToUpdate] = action.payload;

            return {...state, tweets: newTweets}
        }
        case TweetActionTypes.DELETE_TWEET: {
            return {...state, tweets: state.tweets.filter(tweet => tweet.id !== action.payload)}
        }
    }
    return state;
}
