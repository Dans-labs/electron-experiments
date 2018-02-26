import * as React from 'react'
import {Component} from 'react'
import {
    BaseFieldArrayProps,
    BaseFieldProps,
    Field,
    FieldArray,
    FormErrors,
    InjectedFormProps,
    reduxForm,
    WrappedFieldArrayProps,
    WrappedFieldProps,
} from "redux-form"
import {Dispatch} from "../util"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"
import {isEmpty} from "lodash"

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
        const result: any = values.members.map(validateMember).filter(value => !isEmpty(value))
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

// temp stuff!
type FieldProps = WrappedFieldProps & BaseFieldProps & { type?: string }

type FieldArrayProps = WrappedFieldArrayProps<MemberData> & BaseFieldArrayProps<MemberData>

const RenderField = ({input, label, type, meta: {touched, error, active}}: FieldProps) => {
    const hasError = touched && error

    return (
        <div className={[
            hasError ? 'error' : '',
            active ? 'active' : '',
        ].join(' ')}>
            <label>{label}</label>
            <input {...input} type={type} placeholder={label}/>
            {hasError && <span>{error}</span>}
        </div>
    )
}

// TODO we can't provide the type here. Awaiting https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23592
// to be resolved. Once changed, turn '"noImplicitAny": true' in tsconfig.json back on!
const RenderMembers = (props/*: FieldArrayProps*/) => {
    // TODO move destructuring to lambda argument once typing issues are resolved
    const {fields, meta} = props

    // TODO submitFailed is not part of the type definition of FieldArrayProps, but it actually is there,
    // according to the JavaScript implementation.
    // See also https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23842
    const hasError = meta.submitFailed && meta.error

    return (
        <ul className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
        ].join(' ')}>
            <button type="button" onClick={() => fields.push({})}>Add Member</button>
            {hasError && <span>{meta.error}</span>}
            {fields.map((member, index) => {
                return <div key={index}>
                    <button
                        type="button"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}>Remove Member #{index + 1}</button>
                    <h4>Member #{index + 1}</h4>
                    <Field
                        name={`${member}.firstName`}
                        type="text"
                        component={RenderField}
                        label="First Name"
                    />
                    <Field
                        name={`${member}.lastName`}
                        type="text"
                        component={RenderField}
                        label="Last Name"
                    />
                </div>
            })}
        </ul>
    )
}

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
            <Field name="clubName" label="Club Name" type="text" component={RenderField}/>
            <FieldArray name="members" component={RenderMembers}/>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const form = reduxForm<RepeatableFormData>({form: 'repeatable-form', validate})(RepeatableForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
