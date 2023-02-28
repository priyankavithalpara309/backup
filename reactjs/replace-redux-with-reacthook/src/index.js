import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { combineReducers, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import productReducer from "./store/reducers/products";
import reportWebVitals from "./reportWebVitals";
import ProductsProvider from './context/products-context';

import configureStore from "./hooks-store/products-store";
// const rootReducer = combineReducers({
//   shop: productReducer,
// });

// const store = createStore(rootReducer);

//use custom hook

configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ProductsProvider> in customhook don't need to add this
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </ProductsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
