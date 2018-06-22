import * as React from "react"
import { connect } from "react-redux"
import { AppState } from "../model/AppState"
import { Action } from "redux"
import { decrement, increment } from "../actions/counterActions"

interface CounterProps {
    value: number
    increment: () => Action
    decrement: () => Action
}

const Counter = ({ value, increment, decrement }: CounterProps) => (
    <>
        <h2>Counter: {value}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </>
)

const mapStateToProps = (state: AppState) => ({
    value: state.counter.value,
})

export default connect(mapStateToProps, {increment, decrement})(Counter)
