import * as React from "react"
import { Component } from "react"
import { Field, InjectedFormProps } from "redux-form"
import { RenderInput } from "../../lib/form"

export interface ComposedForm3Data {
    favNum: number
    mypassword: string
}

interface ComposedForm3Props {
}

type AllComposedForm3Props = ComposedForm3Props & InjectedFormProps<ComposedForm3Data>

class ComposedForm3 extends Component<AllComposedForm3Props> {
    render() {
        return (
            <form>
                <Field name="favNum"
                       label="Favorite number"
                       component={RenderInput}
                       type="number"/>
                <Field name="mypassword"
                       label="Password"
                       component={RenderInput}
                       type="password"/>
            </form>
        )
    }
}

export default ComposedForm3
