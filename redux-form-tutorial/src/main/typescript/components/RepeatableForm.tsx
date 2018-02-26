import * as React from 'react'
import {Component} from 'react'
import {Field, FieldArray, FormErrors, InjectedFormProps, reduxForm} from "redux-form"
import {Dispatch} from "../util"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"

const validate = (values: RepeatableFormData) => {
    // TODO this any is just to keep the typechecker happy. Should actually be 'string' instead.
    // See also https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23922, remark 1
    const errors: FormErrors<RepeatableFormData, any> = {} // TODO deal with this any?

    if (!values.clubName) {
        errors.clubName = "Required"
    }

    if (!values.members || !values.members.length) {
        errors.members = {_error: "At least one member must be entered"}
    }
    else {
        // TODO type any is not correct, but for now it makes sure that everything compiles...
        // See also https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23922, remark 2
        const result: any = values.members.map(validateMember)
        if (result.length) {
            errors.members = result
        }
    }

    console.log("validation errors", errors)

    return errors
}

const validateMember = (values: MemberData) => {
    const errors: FormErrors<MemberData> = {}

    if (!values.firstName) {
        errors.firstName = "Required"
    }

    if (!values.lastName) {
        errors.lastName = "Required"
    }

    return errors
}

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
        <Field name={`${name}.firstName`} label="First Name" component={RenderInput}/>
        <Field name={`${name}.lastName`} label="Last Name" component={RenderInput}/>
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
            <Field name="clubName" label="Club Name" component={RenderInput}/>
            <FieldArray name="members" label="Add Member" component={RepeatableMember}/>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const form = reduxForm<RepeatableFormData>({form: 'repeatable-form', validate})(RepeatableForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
