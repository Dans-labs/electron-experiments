import * as React from 'react'
import {Component} from 'react'
import {WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"

type FieldProps = WrappedFieldProps & BaseFieldProps
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

const createRenderer = (renderer: renderer) => ({input, meta, label, name, ...rest}: FieldProps) => {
    const changed = (meta as any).changed
    const errorCondition = meta.error && changed

    return <div className={[
        errorCondition ? 'error' : '',
        meta.active ? 'active' : '',
    ].join(' ')}>
        <label>{label}</label>
        {renderer(input, label, rest)}
        {errorCondition && <span>{meta.error}</span>}
    </div>
}

export const RenderInput = createRenderer((input, label) => <input {...input} placeholder={label}/>)

export const RenderSelect = createRenderer((input, label, {children}) => <select {...input}>{children}</select>)

interface RadioChoice {
    title: string,
    value: string
}

type RenderRadioProps = FieldProps & { choices: RadioChoice[] }

export class RenderRadio extends Component<RenderRadioProps> {
    constructor(props: RenderRadioProps) {
        super(props)
    }

    render() {
        const {input, label, meta, choices} = this.props
        const hasError = meta.touched && meta.error

        return <div className={hasError ? 'error' : ''}>
            <label>{label}</label>
            <div id="radio-choices">
                {choices.map(({title, value}) => {
                    return <label key={title} id="radio-choice">
                        <input type="radio"
                               {...input}
                               value={title}
                        />
                        {` ${value}`}
                    </label>
                })}
            </div>
            {hasError && <span className="error">{meta.error}</span>}
        </div>
    }
}

