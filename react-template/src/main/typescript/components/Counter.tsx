import * as React from "react"
import { Component } from "react"

interface CounterProps {
}

interface CounterState {
    value: number
}

class Counter extends Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props)
        this.state = { value: 0 }
    }

    increment = () => {
        this.setState(prevState => ({ value: prevState.value + 1 }))
    }

    decrement = () => {
        this.setState(prevState => ({ value: prevState.value - 1 }))
    }

    render() {
        return (
            <>
                <h2>Counter: {this.state.value}</h2>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </>
        )
    }
}

export default Counter
