import * as React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { Dispatch } from "../../util"
import { submit } from 'redux-form'

interface SubmitButtonProps {
    dispatch: Dispatch
}

class SubmitButton extends Component<SubmitButtonProps> {
    handleSubmit = () => {
        this.props.dispatch(submit('composedForm'))
    }

    render() {
        return (
            <button type="button"
                    className="submitButton"
                    onClick={this.handleSubmit}
            >Submit</button>
        )
    }
}

export default connect()(SubmitButton)
