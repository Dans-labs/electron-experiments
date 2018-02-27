import * as React from 'react'
import {Component} from 'react'
import {connect, MapDispatchToProps} from "react-redux"
import {AppState} from "../model/AppState"
import {Dispatch} from "../util"

interface FoldableProps {
    title: string
    required?: boolean
    recommended?: boolean
    defaultOpened?: boolean
}

// TODO can I move this state to Redux?
interface FoldableState {
    opened: boolean
}

const Required = () => <span className="required">Required</span>
const Recommended = () => <span className="required">Recommended</span>

class Foldable extends Component<FoldableProps, FoldableState> {
    constructor(props: FoldableProps) {
        super(props)
        this.state = {
            opened: this.props.defaultOpened || false
        }
    }

    handleClick = () => {
        this.setState((prevState) => ({...prevState, opened: !prevState.opened}))
    }

    private renderPriority = () => {
        if (this.props.required)
            return <Required/>
        else if (this.props.recommended)
            return <Recommended/>
    }

    render() {
        return <div className={this.state.opened == true ? "card open" : "card closed"}>
            <div className="header" onClick={this.handleClick}>{this.props.title}{this.renderPriority()}</div>
            <div className="body">{this.props.children}</div>
        </div>
    }
}

export default Foldable
