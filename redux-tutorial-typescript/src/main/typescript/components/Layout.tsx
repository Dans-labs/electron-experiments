import * as React from 'react'
import {Component} from 'react'
import {Tweet} from "../model/tweet"
import {User} from "../model/user"
import {connect} from "react-redux"
import {AppState} from "../model/app"
import {fetchUser} from "../actions/userActions"
import {fetchTweets, updateTweet, callLocal} from "../actions/tweetActions"
import {Dispatch, ReduxAction} from "../util"

const monkeys = require("../../resources/img/chimps.jpg")

interface LayoutProps {
    user: User
    userFetched: boolean
    tweets: Tweet[]
    errorMsg: string
    fetchUsers: () => ReduxAction<User>
    fetchTweets: () => Promise<void>
    updateTweet: (id: string, text: string) => ReduxAction<Tweet>
    callLocal: () => Promise<void>
}

class Layout extends Component<LayoutProps> {
    componentWillMount() {
        this.props.fetchUsers()
    }

    fetchTweets = () => this.props.fetchTweets()

    updateFirstTweet = () => this.props.updateTweet("59f9fc94deab220100b5c92f", "Obama")

    callLocal = () => this.props.callLocal()

    render() {
        const {user, tweets} = this.props

        const body = this.props.errorMsg != undefined
            ? <p>{this.props.errorMsg}</p>
            : !tweets.length
                ? <button onClick={this.fetchTweets}>load tweets</button>
                : <div>
                    <button onClick={this.updateFirstTweet}>update first tweet</button>
                    <ul>{tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)}</ul>
                </div>

        return <div>
            <h1 className='name'>{user.name}</h1>
            <img src={monkeys} width="200px"/><br/>
            <button onClick={this.callLocal}>call '/hello'</button>
            {body}
        </div>
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        user: state.user.user,
        userFetched: state.user.fetched,
        tweets: state.tweets.tweets,
        errorMsg: state.tweets.error,
    })
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return ({
        fetchUsers: () => dispatch(fetchUser()),
        fetchTweets: () => fetchTweets(dispatch),
        updateTweet: (id: string, text: string) => dispatch(updateTweet(id, text)),
        callLocal: () => callLocal(dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
