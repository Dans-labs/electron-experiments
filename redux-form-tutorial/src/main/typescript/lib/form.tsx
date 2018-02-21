import * as React from 'react'
import {Component} from 'react'
import {WrappedFieldInputProps} from "redux-form"
import {BaseFieldProps, WrappedFieldProps} from "redux-form/lib/Field"
import DatePicker from 'react-datepicker'
import * as moment from "moment"
import {Moment} from "moment"

type FieldProps = WrappedFieldProps & BaseFieldProps
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

const createRenderer = (renderer: renderer) => ({input, meta, label, name, ...rest}: FieldProps) => {
    const changed = (meta as any).changed
    const hasError = meta.error && changed

    return <div className={[
        hasError ? 'error' : '',
        meta.active ? 'active' : '',
    ].join(' ')}>
        <label>{label}</label>
        {renderer(input, label, rest)}
        {hasError && <span>{meta.error}</span>}
    </div>
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

export class RenderRadio extends Component<FieldProps & RadioProps> {
    constructor(props: FieldProps & RadioProps) {
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

interface DatePickerProps {
    minDate?: Moment
    maxDate?: Moment
}

export class RenderDatePicker extends Component<DatePickerProps & FieldProps> {
    constructor(props: DatePickerProps & FieldProps) {
        super(props)
    }

    dateFormat = "DD-MM-YYYY"

    handleChange = (date: Moment) => {
        this.props.input.onChange(date ? moment(date).format(this.dateFormat) : "")
    }

    render() {
        const {input, label, meta, minDate, maxDate} = this.props
        const changed = (meta as any).changed
        const hasError = meta.error && changed

        return <div className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
        ].join(' ')}>
            <label>{label}</label>
            <DatePicker {...input}
                        dateFormat={this.dateFormat}
                        minDate={minDate}
                        maxDate={maxDate}

                        todayButton="Today"
                        disabledKeyboardNavigation
                        isClearable

                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}

                        placeholderText={label}
                        selected={input.value ? moment(input.value, this.dateFormat) : null}
                        onChange={this.handleChange}>
                <div style={{color: 'red'}}>This date must be in the future!</div>
            </DatePicker>
            {hasError && <span>{meta.error}</span>}
        </div>
    }
}
