import * as React from 'react'
import {Component} from 'react'
import {Tweet} from "../model/tweet"
import {User} from "../model/user"
import {connect} from "react-redux"
import {AppState} from "../model/app"
import {fetchUser} from "../actions/userActions"
import {callLocal, deleteTweet, fetchTweets, updateTweetWithIndex} from "../actions/tweetActions"
import {Dispatch, ReduxAction} from "../lib/redux"

const monkeys = require("../../resources/img/chimps.jpg")

interface LayoutProps {
    user: User
    tweets: Tweet[]
    tweetsFetching: boolean
    tweetsFetched: boolean
    errorMsg: string
    fetchUsers: () => ReduxAction<User>
    fetchTweets: () => Promise<void>
    updateTweet: (index: number, text: string) => ReduxAction<any>
    deleteTweet: (id: string) => ReduxAction<string>
    callLocal: () => Promise<void>
}

class Layout extends Component<LayoutProps> {
    componentWillMount() {
        this.props.fetchUsers()
    }

    fetchTweets = () => this.props.fetchTweets()

    updateFirstTweet = () => this.props.updateTweet(0, "Hello World")

    deleteTweet = (id: string) => this.props.deleteTweet(id)

    callLocal = () => this.props.callLocal()

    render() {
        const {user, tweets, errorMsg, tweetsFetching, tweetsFetched} = this.props

        const err = errorMsg == undefined ? <div/> : <p>{errorMsg}</p>

        const loadTweets = !tweets.length
            ? <button disabled={tweetsFetching || tweetsFetched} onClick={this.fetchTweets}>load tweets</button>
            : <div>
                <button onClick={this.updateFirstTweet}>update first tweet</button>
                <ul>{tweets.map(tweet => <li onDoubleClick={() => this.deleteTweet(tweet.id)} key={tweet.id}>{tweet.text}</li>)}</ul>
            </div>

        return <div>
            <h1 className='name'>{user.name}</h1>

            <img src={monkeys} width="200px"/><br/>

            <p>this button is meant to call '/hello' on the same base URL. If this path doesn't exist, it will give a 404 in the console.</p>
            <button onClick={this.callLocal}>call '/hello'</button>

            {err}

            {loadTweets}
        </div>
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        user: state.user.user,
        tweets: state.tweets.tweets,
        tweetsFetching: state.tweets.fetching,
        tweetsFetched: state.tweets.fetched,
        errorMsg: state.tweets.error,
    })
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return ({
        fetchUsers: () => dispatch(fetchUser()),
        fetchTweets: () => fetchTweets(dispatch),
        updateTweet: (index: number, text: string) => dispatch(updateTweetWithIndex(index, text)),
        deleteTweet: (id: string) => dispatch(deleteTweet(id)),
        callLocal: () => callLocal(dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
