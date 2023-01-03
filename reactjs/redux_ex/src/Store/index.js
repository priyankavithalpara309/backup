// import {legacy_createStore as createStore } from "redux";
// import {createStore } from "redux"; // if createStore does not work then add legacy_createStore 

import { createSlice, configureStore } from "@reduxjs/toolkit";

const temp = {counter: 0, showCounter: true} ;

const counterSlice = createSlice({
  // name: 'counter', temp, reducers:{
    name: 'counter', initialState:temp, reducers:{
    increment(state){
      state.counter++;
    },
    decrement(state){
      state.counter--;
    },
    increase(state, action){
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state){
      state.showCounter = !state.showCounter;
    }
  }
});

const initialAuthState ={
  isAuthenticated: false,
}

const authSlice = createSlice({
  name:'authentication',
  initialState:initialAuthState,
  reducers:{
    login(state){
      state.isAuthenticated = true;
    },
    logout(state){
      state.isAuthenticated=false;
    },
  },
});

const store = configureStore({
  reducer: {counter:counterSlice.reducer, auth:authSlice.reducer},
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

// const store = configureStore({
//   reducer: counterSlice.reducer
// });

// export const counterActions = counterSlice.actions;

// const counterReducer = (state = temp, action) => {
//   if (action.type === 'increment') {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     };
//   }

//   if(action.type === 'increase'){
//     return{
//         counter: state.counter + action.number,
//         showCounter: state.showCounter
//     };
//   }

//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     };
//   }

//   if(action.type === 'toggle'){
//     return{        
//         showCounter: !state.showCounter,
//         counter:state.counter
//     };
//   }

//   return state;
// };

// const store = createStore(counterReducer);

export default store;