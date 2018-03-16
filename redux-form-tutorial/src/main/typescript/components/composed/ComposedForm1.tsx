import * as React from "react"
import { Component } from "react"
import { Field, InjectedFormProps } from "redux-form"
import { RenderInput } from "../../lib/form"

export interface ComposedForm1Data {
    firstName: string
    lastName: string
}

interface ComposedForm1Props {

}

type AllComposedForm1Props = ComposedForm1Props & InjectedFormProps<ComposedForm1Data>

class ComposedForm1 extends Component<AllComposedForm1Props> {
    render() {
        return (
            <form>
                <Field name="firstName"
                       label="First Name"
                       component={RenderInput}/>
                <Field name="lastName"
                       label="Last Name"
                       component={RenderInput}/>
            </form>
        )
    }
}

export default ComposedForm1
