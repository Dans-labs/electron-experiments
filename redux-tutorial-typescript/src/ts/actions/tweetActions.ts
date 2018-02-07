import {TweetActionTypes} from "../constants/tweetsConstants"
import axios from "axios"
import {Tweet} from "../model/tweet"
import {Dispatch, ReduxAction} from "../util"

const fetchTweets: () => (dispatch: Dispatch) => void = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: TweetActionTypes.FETCH_TWEETS,
            payload: axios.get("http://rest.learncode.academy/api/reacttest/tweets"),
            //// TODO when using multiple calls chained, use the construction below.
            //// see also https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/async-await.md
            // async payload() {
            //     const response = await axios.get("http://rest.learncode.academy/api/reacttest/tweets")
            //
            //     return response
            // }
        })
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

const deleteTweet: (id: string) => ReduxAction<string> = id => ({
    type: TweetActionTypes.DELETE_TWEET,
    payload: id,
})

export {
    fetchTweets,
    addTweet,
    updateTweet,
    deleteTweet,
}
