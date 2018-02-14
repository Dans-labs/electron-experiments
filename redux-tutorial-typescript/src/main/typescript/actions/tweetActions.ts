import {TweetActionTypes} from "../constants/tweetsConstants"
import axios from "axios"
import {Tweet} from "../model/tweet"
import {Dispatch, ReduxAction} from "../util"

const callLocal: (dispatch: Dispatch) => Promise<void> = async (dispatch: Dispatch) => {
    try {
        const response = await axios.get("/hello")
        console.log("response", response)
    }
    catch (e) {
        console.log("error", e)
    }
}

const fetchTweets: (dispatch: Dispatch) => Promise<void> = async (dispatch: Dispatch) => {
    dispatch({type: TweetActionTypes.FETCH_TWEETS_PENDING})

    try {
        const response = await axios.get("http://rest.learncode.academy/api/reacttest/tweets")
        dispatch({type: TweetActionTypes.FETCH_TWEETS_FULFILLED, payload: response})
    }
    catch (e) {
        dispatch({type: TweetActionTypes.FETCH_TWEETS_REJECTED, payload: e})
    }
}

const addTweet: (id: string, text: string) => ReduxAction<Tweet> = (id, text) => ({
    type: TweetActionTypes.ADD_TWEET,
    payload: ({id: id, text: text}),
})

const updateTweet: (id: string, text: string) => ReduxAction<Tweet> = (id, text) => ({
    type: TweetActionTypes.UPDATE_TWEET,
    payload: ({id: id, text: text}),
})

const updateTweetWithIndex: (index: number, text: string) => ReduxAction<{index: number, text: string}> = (index, text) => ({
    type: TweetActionTypes.UPDATE_TWEET_WITH_INDEX,
    payload: ({index: index, text: text})
})

const deleteTweet: (id: string) => ReduxAction<string> = id => ({
    type: TweetActionTypes.DELETE_TWEET,
    payload: id,
})

export {
    fetchTweets,
    addTweet,
    updateTweet,
    updateTweetWithIndex,
    deleteTweet,
    callLocal,
}
