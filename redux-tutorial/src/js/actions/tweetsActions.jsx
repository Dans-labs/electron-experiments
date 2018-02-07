import axios from "axios";
import * as TweetsConstants from "../constants/tweetsConstants.jsx";

// Lesson learned from @jochem725 on using async await for axios/fetch calls
// this is better than using then/catch methods, especially when doing multiple calls one after the other
export const fetchTweets = () => {
    return async (dispatch) => {
        dispatch({type: TweetsConstants.FETCH_TWEETS});

        try {
            const response = await axios.get("http://rest.learncode.academy/api/reacttest/tweets")
            dispatch({type: TweetsConstants.FETCH_TWEETS_FULFILLED, payload: response.data})
        }
        catch (e) {
            dispatch({type: TweetsConstants.FETCH_TWEETS_REJECTED, payload: e})
        }
    }
}

export function addTweet(id, text) {
    return {
        type: TweetsConstants.ADD_TWEET,
        payload: {
            id,
            text,
        },
    }
}

export function updateTweet(id, text) {
    return {
        type: TweetsConstants.UPDATE_TWEET,
        payload: {
            id,
            text,
        },
    }
}

export function deleteTweet(id) {
    return {type: TweetsConstants.DELETE_TWEET, payload: id}
}
