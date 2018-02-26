import * as React from 'react'
import {Component} from 'react'
import {Field, FieldArray, InjectedFormProps, reduxForm} from "redux-form"
import {Dispatch} from "../util"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"
import {createRepeatedRender, RenderInput} from "../lib/form"

const isRequired = (errorText: string) => (value?: any) => value ? undefined : errorText
const required = isRequired("Required")
const nonEmptyList = (values?: any[]) => values && values.length ? undefined : "At least one element must be entered"

interface MemberData {
    firstName?: string
    lastName?: string
}

interface RepeatableFormData {
    clubName?: string
    members: MemberData[]
}

interface RepeatableFormProps {

}

type AllRepeatableFormProps = RepeatableFormProps & InjectedFormProps<RepeatableFormData>

const RepeatableMember = createRepeatedRender((name, index, fields) => {
    return <div key={index}>
        <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}>Remove Member #{index + 1}</button>
        <h4>Member #{index + 1}</h4>
        <Field name={`${name}.firstName`} label="First Name" component={RenderInput} validate={[required]}/>
        <Field name={`${name}.lastName`} label="Last Name" component={RenderInput} validate={[required]}/>
    </div>
})

class RepeatableForm extends Component<AllRepeatableFormProps> {
    constructor(props: AllRepeatableFormProps) {
        super(props)
    }

    submitForm = async (values: RepeatableFormData, dispatch: Dispatch, props: AllRepeatableFormProps) => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        // TODO submit form data
    }

    render() {
        return <form onSubmit={this.props.handleSubmit(this.submitForm)}>
            <Field name="clubName" label="Club Name" component={RenderInput} validate={[required]}/>
            <FieldArray name="members" label="Add Member" component={RepeatableMember} empty={{}} validate={[nonEmptyList]}/>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const form = reduxForm<RepeatableFormData>({form: 'repeatableform'})(RepeatableForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
