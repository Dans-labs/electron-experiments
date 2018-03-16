import * as React from "react"
import { Component } from "react"
import { Field, InjectedFormProps } from "redux-form"
import { RenderInput } from "../../lib/form"

export interface ComposedForm2Data {
    age: number
    email: string
}

interface ComposedForm2Props {
}

type AllComposedForm2Props = ComposedForm2Props & InjectedFormProps<ComposedForm2Data>

class ComposedForm2 extends Component<AllComposedForm2Props> {
    render() {
        return (
            <form>
                <Field name="age"
                       label="Age"
                       component={RenderInput}
                       type="number"/>
                <Field name="email"
                       label="Email"
                       component={RenderInput}
                       type="email"/>
            </form>
        )
    }
}

export default ComposedForm2
