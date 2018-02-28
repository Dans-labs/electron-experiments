import * as React from 'react'
import {Component} from 'react'
import {Dispatch, ReduxAction} from "../util"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {RenderInput} from "../lib/form"
import {loadDataFromServer, storeData} from "../actions/loadFromStateActions"
import {connect} from "react-redux"
import {AppState} from "../model/AppState"

export interface FormData {
    firstName?: string
    lastName?: string
    age?: number
}

interface LoadFromStateFormProps {
    submitForm: (data: FormData) => ReduxAction<FormData>
    loadData: (id: string) => Promise<ReduxAction<FormData>>
}

type AllLoadFromStateFormProps = LoadFromStateFormProps & InjectedFormProps<FormData>

class LoadFromStateForm extends Component<AllLoadFromStateFormProps> {
    constructor(props: AllLoadFromStateFormProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData("abc")
    }

    submitForm = (values: FormData) => {
        this.props.submitForm(values)
    }

    render() {
        return <form onSubmit={this.props.handleSubmit(this.submitForm)}>
            <Field name="firstName"
                   label="First Name"
                   component={RenderInput}/>

            <Field name="lastName"
                   label="Last Name"
                   component={RenderInput}/>

            <Field name="age"
                   label="Age"
                   type="number"
                   component={RenderInput}/>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
        </form>
    }
}

const mapStateToProps = (state: AppState) => ({
    initialValues: state.initialState,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    submitForm: data => dispatch(storeData(data)),
    loadData: id => loadDataFromServer(id)(dispatch),
})

const form = reduxForm<FormData>({form: 'loadfromstate', enableReinitialize: true})(LoadFromStateForm)
export default connect<{}>(mapStateToProps, mapDispatchToProps)(form)
