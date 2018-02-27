import * as React from 'react'
import {Component} from 'react'
import {connect} from "react-redux"
import {AppState} from "../model/AppState"
import {Dispatch, ReduxAction} from "../util"
import {register, toggle, unregister} from "../actions/foldableActions"

interface FoldableArguments {
    title: string
    required?: boolean
    recommended?: boolean
    defaultOpened?: boolean
}

interface FoldableProps extends FoldableArguments {
    isOpened: boolean
    toggleCard: (id: string) => ReduxAction<string>
    register: (id: string, open: boolean) => ReduxAction<{id, open}>
    unregister: (id: string) => ReduxAction<string>
}

const Required = () => <span className="required">Required</span>
const Recommended = () => <span className="required">Recommended</span>

class Foldable extends Component<FoldableProps> {
    constructor(props: FoldableProps) {
        super(props)

        this.props.register(this.props.title, this.props.defaultOpened || false)
    }

    componentWillUnmount() {
        this.props.unregister(this.props.title)
    }

    toggleCard = () => {
        this.props.toggleCard(this.props.title)
    }

    private renderPriority = () => {
        if (this.props.required)
            return <Required/>
        else if (this.props.recommended)
            return <Recommended/>
    }

    render() {
        return <div className={this.props.isOpened ? "card open" : "card closed"}>
            <div className="header" onClick={this.toggleCard}>{this.props.title}{this.renderPriority()}</div>
            <div className="body">{this.props.children}</div>
        </div>
    }
}

const mapStateToProps = (state: AppState, props: FoldableArguments) => ({
    isOpened: state.openedCards[props.title]
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleCard: id => dispatch(toggle(id)),
    register: (id, open) => dispatch(register(id, open)),
    unregister: id => dispatch(unregister(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Foldable)
