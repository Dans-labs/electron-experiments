import * as React from 'react'
import {Component} from 'react'
import {AppState, Users} from "../model/AppState"
import {connect} from "react-redux"
import {Dispatch, ReduxAction} from "../util"
import {removeUser} from "../actions/formActions"

interface UsersListProps {
    users: Users,
    removeUser: (id: string) => ReduxAction<string>
}

class UsersList extends Component<UsersListProps> {
    constructor(props: UsersListProps) {
        super(props)
    }

    deleteUser = (id: string) => {
        this.props.removeUser(id)
    }

    render() {
        return <ul>{this.props.users.map(user => {
            return <li onDoubleClick={() => this.deleteUser(user.id)} key={user.id}>{user.name}</li>
        })}</ul>
    }
}

const mapStateToProps = (state: AppState) => ({
    users: state.users,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeUser: (id: string) => dispatch(removeUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
