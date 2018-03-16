import * as React from "react"
import { reduxForm } from "redux-form"
import Foldable from "../Foldable"
import ComposedForm1, { ComposedForm1Data } from "./ComposedForm1"
import ComposedForm2, { ComposedForm2Data } from "./ComposedForm2"
import ComposedForm3, { ComposedForm3Data } from "./ComposedForm3"
import SubmitButton from "./SubmitButton"

export type FormData = ComposedForm1Data & ComposedForm2Data & ComposedForm3Data

const submit = (values: FormData) => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

    // in a real app, this would be the place to dispatch an action that calls the backend server
}

const renderForm = () => {
    return reduxForm({
        form: "composedForm",
        forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        onSubmit: submit,
    })
}

const Form1 = renderForm()(ComposedForm1)
const Form2 = renderForm()(ComposedForm2)
const Form3 = renderForm()(ComposedForm3)

const ComposedForm = () => (
    <div>
        <Foldable title="composed form 1" defaultOpened required>
            <Form1/>
        </Foldable>

        <Foldable title="composed form 2" defaultOpened recommended>
            <Form2/>
        </Foldable>

        <Foldable title="composed form 3">
            <Form3/>
        </Foldable>

        <SubmitButton/>
    </div>
)

export default ComposedForm
