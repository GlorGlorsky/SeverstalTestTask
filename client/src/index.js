import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
