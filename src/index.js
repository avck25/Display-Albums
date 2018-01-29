import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
