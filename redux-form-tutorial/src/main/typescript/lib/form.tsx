import * as React from 'react'
import {Component} from 'react'
import {WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"
import DatePicker from 'react-datepicker'
import * as moment from "moment"
import {Moment} from "moment"
import {Simulate} from "react-dom/test-utils"
import input = Simulate.input

type FieldProps = WrappedFieldProps & BaseFieldProps
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

function createRenderer<T>(renderer: renderer) {
    return (props: FieldProps & T) => {
        const {input, meta, label} = props
        const changed = (meta as any).changed
        const hasError = meta.error && changed

        return <div className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
        ].join(' ')}>
            <label>{label}</label>
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

export const RenderRadio = createRenderer<RadioProps>((input, label, {choices}: {choices: RadioChoice[]}) =>
    <div id="radio-choices">
        {choices.map(({title, value}) => {
            return <label key={title} id="radio-choice">
                <input {...input}
                       type="radio"
                       value={title}
                />
                {` ${value}`}
            </label>
        })}
    </div>
)

interface DatePickerProps {
    dateFormat: string
    minDate?: Moment
    maxDate?: Moment
}

export const RenderDatePicker = createRenderer<DatePickerProps>((input, label, {minDate, maxDate, dateFormat}) =>
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
    </DatePicker>,
)
