import * as TweetsConstants from "../constants/tweetsConstants.jsx";

const defaultState = {
    tweets: [],
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case TweetsConstants.FETCH_TWEETS: {
            return {...state, fetching: true}
        }
        case TweetsConstants.FETCH_TWEETS_REJECTED: {
            return {...state, fetching: false, error: action.payload}
        }
        case TweetsConstants.FETCH_TWEETS_FULFILLED: {
            return {...state, fetching: false, fetched: true, tweets: action.payload}
        }
        case TweetsConstants.ADD_TWEET: {
            return {...state, tweets: [...state.tweets, action.payload]}
        }
        case TweetsConstants.UPDATE_TWEET: {
            const { id } = action.payload
            const newTweets = [...state.tweets]
            const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
            newTweets[tweetToUpdate] = action.payload;

            return {...state, tweets: newTweets}
        }
        case TweetsConstants.DELETE_TWEET: {
            return {...state, tweets: state.tweets.filter(tweet => tweet.id !== action.payload)}
        }
    }

    return state
}

