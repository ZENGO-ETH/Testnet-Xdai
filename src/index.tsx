import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/GT-Planar/GT-Planar-Regular.woff";
import "./fonts/GT-Planar/GT-Planar-Regular.woff2";
import "./fonts/GT-Planar/GT-Planar-Regular.ttf";
import "./fonts/Avenir-Next/AvenirNext-Regular.otf";
import "./fonts/Avenir-Next/AvenirNext-Bold.otf";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
