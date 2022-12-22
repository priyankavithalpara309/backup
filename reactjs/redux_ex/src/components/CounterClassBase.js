import { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import styles from './Counter.module.css';

//use class in redux

class CounterClassBase extends Component{

    incrementHandler(){
        this.props.increment();
    }

    increaseHandler(){
        this.props.increase();
    }

    decrementHandler(){
        this.props.decrement();
    }

    toggleCounterHandler(){
        this.props.toggle();
    }

    render(){
        return(
            <main className={styles.counter}>
                <h1>Redux Counter</h1>
                {this.props.show && <div className={styles.value}>{this.props.counter}</div>}
                <div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.increaseHandler.bind(this)}>Increase by 5</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                </div>
                <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return{
        counter: state.counter,
        show: state.showCounter
    };
}

const mapDispatchToProps = dispatch => {
    return{
        increment: () => dispatch({type: 'increment'}),
        decrement: () => dispatch({type: 'decrement'}),
        increase: () => dispatch({type: 'increase', number: 5}),
        toggle: () => dispatch({type: 'toggle'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterClassBase);