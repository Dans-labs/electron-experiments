import * as React from 'react'
import {Component} from 'react'
import {AppState, Persons, User} from "../model/AppState"
import {connect} from "react-redux"
import {Dispatch, ReduxAction} from "../util"
import {removeUser} from "../actions/formActions"

interface PersonsListProps {
    persons: Persons,
}

class PersonsList extends Component<PersonsListProps> {
    constructor(props: PersonsListProps) {
        super(props)
    }

    render() {
        return <ul>{this.props.persons.map((person, index) => {
            return <li key={index}>{JSON.stringify(person)}</li>
        })}</ul>
    }
}

const mapStateToProps = (state: AppState) => ({
    persons: state.persons,
})

export default connect(mapStateToProps)(PersonsList)
