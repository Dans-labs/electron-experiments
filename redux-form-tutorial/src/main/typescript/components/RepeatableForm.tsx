import * as React from 'react'
import {Component} from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {Dispatch} from "../util"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"

interface RepeatableFormData {

}

interface RepeatableFormProps {

}

type AllRepeatableFormProps = RepeatableFormProps & InjectedFormProps<RepeatableFormData>

class RepeatableForm extends Component<AllRepeatableFormProps> {
    constructor(props: AllRepeatableFormProps) {
        super(props)
    }

    submitForm = async (values: RepeatableFormData, dispatch: Dispatch, props: AllRepeatableFormProps) => {
        console.log(values)
        // TODO submit form data
    }

    render() {
        return <form onSubmit={this.props.handleSubmit(this.submitForm)}>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const form = reduxForm<RepeatableFormData>({form: 'repeatable'})(RepeatableForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
