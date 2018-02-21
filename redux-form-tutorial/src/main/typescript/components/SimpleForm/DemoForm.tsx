import * as React from 'react'
import {Component} from 'react'
import {Field, InjectedFormProps, reduxForm, SubmissionError} from "redux-form"
import * as EmailValidator from 'email-validator'
import provinces from '../../constants/provinces'
import {RenderCheckbox, RenderComposed, RenderDatePicker, RenderInput, RenderRadio, RenderSelect} from "../../lib/form"
import {Dispatch, ReduxAction} from "../../util"
import {addUser} from "../../actions/formActions"
import {connect} from "react-redux"
import * as moment from "moment"

export interface DemoFormData {
    firstName?: string
    lastName?: string
    email?: string
    province?: string
    number?: string
    sex?: string
    birthday?: string
    coordinateX?: string
    coordinateY?: string
    coordinateZ?: string
    accept: boolean
}

interface DemoFormProps extends InjectedFormProps<DemoFormData, DemoFormProps> {
    submitForm: (name: string) => ReduxAction<string>
}

const isRequired = (errorText: string) => (value?: any) => value ? undefined : errorText
const required = isRequired("Required")
const accept = isRequired("You need to check this box before submitting!")

const email = (value?: string) => value && EmailValidator.validate(value) ? undefined : "Invalid email address"

const number = (value?: string) => value && Number(value) ? undefined : "This should be a numeric value"
const minValue = (min: number) => (value?: number) => value && value >= min ? undefined : `Must be at least ${min}`
const min0 = minValue(0)

const dateAfterNow = (format: string) => (value?: string) => !value || moment(value, format).isSameOrAfter(moment()) ? undefined : "This date should be in the future"

class DemoForm extends Component<DemoFormProps> {
    constructor(props: DemoFormProps) {
        super(props)
    }

    showResults = async (values: DemoFormData) => {
        // simulate web request
        await new Promise(resolve => setTimeout(resolve, 500))

        // simulate submit validation errors from server
        const valid = Math.random() > 0.5
        if (!valid) {
            throw new SubmissionError({
                firstName: "Random submit error on first name",
                province: "Random submit error on province",
                _error: "Submittion failed due to random error",
            })
        }

        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

        this.props.submitForm(`${values.firstName} ${values.lastName}`)

        // reset commented out to make testing easier
        // this.props.reset()
    }

    render() {
        return <form onSubmit={this.props.handleSubmit(this.showResults)}>
            <Field name="firstName"
                   label="First Name"
                   component={RenderInput}
                   required
                   validate={[required]}/>

            <Field name="lastName"
                   label="Last Name"
                   component={RenderInput}
                   required
                   validate={[required]}/>

            <Field name="email"
                   label="Email"
                   component={RenderInput}
                   required
                   validate={[required, email]}/>

            <Field name="province"
                   label="Province"
                   component={RenderSelect}
                   required
                   validate={[required]}>
                <option/>
                {provinces.map(province => <option key={province} value={province}>{province}</option>)}
            </Field>

            <Field name="number"
                   label="Favorite Number"
                   component={RenderInput}
                   required
                   validate={[required, number, min0]}/>

            <Field name="sex"
                   label="Sex"
                   component={RenderRadio}
                   choices={[
                       {title: "male", value: "Male"},
                       {title: "female", value: "Female"},
                       {title: "no", value: "No, thank you"},
                   ]}/>

            <Field name="birthday"
                   label="Birthday"
                   component={RenderDatePicker}
                   dateFormat="DD-MM-YYYY"
                   minDate={moment()}
                   validate={[dateAfterNow("DD-MM-YYYY")]}/>

            <Field name="coordinate"
                   label="Coordinate"
                   component={RenderComposed}>
                <Field name="coordinateX" label="X  " component={RenderInput}/>
                <Field name="coordinateY" label="Y  " component={RenderInput}/>
                <Field name="coordinateZ" label="Z  " component={RenderInput}/>
            </Field>

            <Field name="accept"
                   label="Acceptance"
                   component={RenderCheckbox}
                   text="I accept everything"
                   required
                   validate={[accept]}/>

            {this.props.error && <span>{this.props.error}<br/></span>}

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    submitForm: (name: string) => dispatch(addUser(name)),
})

const form = connect(null, mapDispatchToProps)(DemoForm)

export default reduxForm({
    form: 'demo',
})(form)
