// Polyfills
import "core-js/stable";
import "raf/polyfill";
import "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
