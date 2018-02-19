import * as React from 'react'
import {WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"

type FieldProps = WrappedFieldProps & BaseFieldProps & {submittingFailed?: boolean}
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

const createRenderer = (renderer: renderer) => ({input, meta, label, submittingFailed, ...rest}: FieldProps) => {
    return <div className={[
        meta.error ? 'error' : '',
        meta.active ? 'active' : '',
    ].join(' ')}>
        <label>{label}</label>
        {renderer(input, label, rest)}
        {meta.error && <span>{meta.error}</span>}
    </div>
}

export const RenderInput = createRenderer((input, label) => <input {...input} placeholder={label}/>)
export const RenderSelect = createRenderer((input, label, {children}) => <select {...input}>{children}</select>)
