import { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Counter.module.css';

class CounterClassBase extends Component {

    incrementHandler(){
        this.props.increment();
    }

    decrementHandler(){
        this.props.decrement();
    }

    increaseHandler(){
        this.props.increase();
    }

    toggleCounterHandler(){
        this.props.toggle();
    }

    render() {
        return (
            <main className={styles.counter}>
                <h1>Redux Counter</h1>
                <div className={styles.value}>{this.props.counter}</div>
                <div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.increaseHandler.bind(this)}>Increase by 5</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                </div>
                <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
            </main>
        )
    }
}

//use action from store
const mapDispatchToProps = dispatch => {
    return{
        increment: () => dispatch({type:'increment'}),
        decrement: () => dispatch({type:'decrement'}),
        increase: () => dispatch({type:'increase', number:5}),
        toggle: () => dispatch({type:'toggle'})
    };
}

//use state from store
const mapStateToProps = (state) => {
    return{
        counter: state.counter
    };
}

//connect is to connect class & store it's also we can use in function componet
export default connect(mapStateToProps,mapDispatchToProps)(CounterClassBase);