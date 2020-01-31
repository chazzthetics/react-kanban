import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import App from "./app/App";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import ErrorBoundary from "./components/Layout/ErrorBoundary";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <CSSReset />
      <ErrorBoundary render={(error, errorMessage) => <div>Error!!</div>}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
