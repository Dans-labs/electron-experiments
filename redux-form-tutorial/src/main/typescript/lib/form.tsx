import * as React from 'react'
import {WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"

type FieldProps = WrappedFieldProps & BaseFieldProps
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

const createRenderer = (renderer: renderer) => ({input, meta, label, ...rest}: FieldProps) => {
    const errorCondition = meta.error && meta.touched

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
