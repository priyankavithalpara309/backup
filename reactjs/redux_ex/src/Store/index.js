// import {legacy_createStore as createStore } from "redux";
import {createStore } from "redux"; // if createStore does not work then add legacy_createStore 

const temp = {counter: 0, showCounter: true} ;

const counterReducer = (state = temp, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    };
  }

  if(action.type === 'increase'){
    return{
        counter: state.counter + action.number,
        showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  if(action.type === 'toggle'){
    return{        
        showCounter: !state.showCounter,
        counter:state.counter
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;