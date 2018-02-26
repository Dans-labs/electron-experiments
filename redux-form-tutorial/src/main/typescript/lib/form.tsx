import * as React from 'react'
import {BaseFieldArrayProps, FieldsProps, WrappedFieldArrayProps, WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"
import DatePicker from 'react-datepicker'
import * as moment from "moment"
import {Moment} from "moment"

type FieldProps = WrappedFieldProps & BaseFieldProps & { required?: boolean }
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

function createRenderer<T>(renderer: renderer) {
    return (props: FieldProps & T) => {
        const {input, meta, label, required} = props
        const changed = (meta as any).changed
        const hasError = meta.error && (changed || meta.submitFailed)
        const requiredText = required ? <b style={{color: 'red'}}> *</b> : ""

        return <div className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
            'input-element',
        ].join(' ')}>
            <label>{label}{requiredText}</label>
            {renderer(input, label, props)}
            {hasError && <span>{meta.error}</span>}
        </div>
    }
}

export const RenderInput = createRenderer((input, label) => <input {...input} placeholder={label}/>)

export const RenderSelect = createRenderer((input, label, {children}) => <select {...input}>{children}</select>)

interface RadioChoice {
    title: string,
    value: string
}

interface RadioProps {
    choices: RadioChoice[]
}

export const RenderRadio = createRenderer<RadioProps>((input, label, {choices}: RadioProps) =>
    <div id="radio-choices">
        {choices.map(({title, value}) =>
            <label key={title} id="radio-choice">
                <input {...input}
                       type="radio"
                       value={title}
                />
                {` ${value}`}
            </label>,
        )}
    </div>,
)

interface CheckboxProps {
    text: string
}

export const RenderCheckbox = createRenderer<CheckboxProps>((input, label, {text}: CheckboxProps) =>
    <label id="radio-choices"><input {...input} type="checkbox"/>{` ${text}`}</label>,
)

interface DatePickerProps {
    dateFormat: string
    minDate?: Moment
    maxDate?: Moment
}

// Note to future me:
// This date picker has very specific settings. Can't we use the original props from DatePicker?
// Or should we add more properties to our own DatePickerProps?
export const RenderDatePicker = createRenderer<DatePickerProps>((input, label, {minDate, maxDate, dateFormat}) =>
    <div id="radio-choices">
        <DatePicker {...input}
                    dateFormat={dateFormat}
                    minDate={minDate}
                    maxDate={maxDate}

                    todayButton="Today"
                    disabledKeyboardNavigation
                    isClearable

                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}

                    placeholderText={label}
                    selected={input.value ? moment(input.value, dateFormat) : null}
                    onChange={date => input.onChange(date ? moment(date).format(dateFormat) : "")}>
            <div style={{color: 'red'}}>This date must be in the future!</div>
        </DatePicker>
    </div>,
)

export const RenderComposed = createRenderer((input, label, {children}) => <div id="radio-choices">{children}</div>)

// repeatable elements
type FieldArrayProps<Data> = WrappedFieldArrayProps<Data>
    & BaseFieldArrayProps<Data>
// & { contentF: (name: string, index: number) => JSX.Element }
type arrayRenderer<Data> = (name: string, index: number, field: FieldsProps<Data>) => JSX.Element

export function createRepeatedRender<Data, T>(renderer: arrayRenderer<Data>) {
    // TODO we can't provide the type here. Awaiting https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23592
    // to be resolved. Once changed, turn '"noImplicitAny": true' in tsconfig.json back on!
    return (props/*: FieldArrayProps<Data> & T*/) => {
        const {fields, meta, label, contentF} = props

        // TODO submitFailed is not part of the type definition of FieldArrayProps, but it actually is there,
        // according to the JavaScript implementation.
        // See also https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23842
        const hasError = meta.error && meta.submitFailed

        return <div className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
        ].join(' ')}>
            <button type="button" onClick={() => fields.push({})}>{label}</button>
            {hasError && <span>{meta.error}</span>}
            {fields.map(renderer)}
        </div>
    }
}
