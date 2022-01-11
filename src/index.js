import React, { Suspense } from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";

render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
