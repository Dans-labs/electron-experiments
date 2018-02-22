import * as React from 'react'
import {Component} from 'react'
import { BaseFieldArrayProps, BaseFieldProps, Field, FieldArray, InjectedFormProps, reduxForm, WrappedFieldArrayProps, WrappedFieldProps} from "redux-form"
import {Dispatch} from "../util"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"

interface MembersData {
    firstName?: string
    lastName?: string
}

interface RepeatableFormData {
    clubName?: string
    members: MembersData[]
}

interface RepeatableFormProps {

}

type AllRepeatableFormProps = RepeatableFormProps & InjectedFormProps<RepeatableFormData>

// temp stuff!
type FieldProps = WrappedFieldProps & BaseFieldProps & { type?: string }

type FieldArrayProps = WrappedFieldArrayProps<MembersData> & BaseFieldArrayProps<MembersData>

const RenderField = ({input, label, type, meta: {touched, error}}: FieldProps) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label}/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    )
}

const RenderMembers = (props/*: FieldArrayProps*/) => {
    return (
        <ul>
            <button type="button" onClick={() => props.fields.push({firstName: "FooBar"})}>Add Member</button>
            {/*{props.meta.error && <span>{props.meta.error}</span>}*/}
            {props.fields.map((member, index) => {
                return <div key={index}>
                    <button
                        type="button"
                        title="Remove Member"
                        onClick={() => props.fields.remove(index)}>Remove Member #{index + 1}</button>
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

const form = reduxForm<RepeatableFormData>({form: 'repeatable-form'})(RepeatableForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
