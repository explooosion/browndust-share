// import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "./i18n";
import store from "./store";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </React.StrictMode>
);
