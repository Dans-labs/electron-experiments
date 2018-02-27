import * as React from 'react'
import {Component} from 'react'
import {connect} from "react-redux"
import {AppState} from "../model/AppState"
import {Dispatch, ReduxAction} from "../util"
import {toggle} from "../actions/foldableActions"

interface FoldableArguments {
    title: string
    required?: boolean
    recommended?: boolean
    defaultOpened?: boolean
}

interface FoldableProps extends FoldableArguments {
    toggleCard: (id: string) => ReduxAction<string>
    isOpened: boolean
}

const Required = () => <span className="required">Required</span>
const Recommended = () => <span className="required">Recommended</span>

class Foldable extends Component<FoldableProps> {
    constructor(props: FoldableProps) {
        super(props)

        if (this.props.defaultOpened)
            this.toggleCard()
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
    isOpened: state.openedCards.some(value => value === props.title)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleCard: id => dispatch(toggle(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Foldable)
