import * as React from 'react'
import {Component} from 'react'
import {Tweet} from "../model/tweet"
import {User} from "../model/user"
import {connect, Dispatch} from "react-redux"
import {AppState} from "../model/app"
import {fetchUser} from "../actions/userActions"
import {fetchTweets, updateTweet} from "../actions/tweetActions"

interface LayoutProps {
    user: User
    userFetched: boolean
    tweets: Tweet[]
    dispatch: Dispatch<AppState>
}

class Layout extends Component<LayoutProps> {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchTweets = () => this.props.dispatch(fetchTweets())

    updateFirstTweet = () => this.props.dispatch(updateTweet("59f9fc94deab220100b5c92f", "Obama"))

    render() {
        const {user, tweets} = this.props

        const body = !tweets.length
            ? <button onClick={this.fetchTweets}>load tweets</button>
            : <div>
                <button onClick={this.updateFirstTweet}>update first tweet</button>
                <ul>{tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)}</ul>
            </div>

        return <div>
            <h1>{user.name}</h1>
            {body}
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    console.log(store)
    return ({
        user: store.user.user,
        userFetched: store.user.fetched,
        tweets: store.tweets.tweets,
    })
}

export default connect(mapStateToProps)(Layout)
