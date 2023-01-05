import styles from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../Store/Counter';
// import { counterActions } from '../Store/index';

const Counter = () => {

  const dispatch=useDispatch();
  const counter= useSelector((state) => state.counter.counter);
  const show= useSelector((state) => state.counter.showCounter);

  const increase = () =>{
    dispatch(counterActions.increase(10));
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const increment = () =>{
    dispatch(counterActions.increment());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };  
  // const increment = () =>{
  //   dispatch({type:'increment'});
  // }

  // //use of payloads
  // const increase = () => {
  //   dispatch({type:'increase', number:5})
  // }

  // const decrement = () =>{
  //   dispatch({type:'decrement'})
  // }
 
  //   const toggleCounterHandler = () =>{
  //     dispatch({type:'toggle'})
  //   };    
  
    return (
      <main className={styles.counter}>
        <h1>Redux Counter</h1>
        {show && <div className={styles.value}>{counter}</div>}
        <div>
          <button onClick={increment}>Increment</button>
          <button onClick={increase}>Increase by 5</button>
          <button onClick={decrement}>Decrement</button>
        </div>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  };
  
  export default Counter;