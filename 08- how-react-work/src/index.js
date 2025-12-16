import React from "react";

import { createRoot } from "react-dom/client"; // 19
// import ReactDOM from "react-dom/client"; // 18
// import ReactDOM from "react-dom"; // 17

import App from "./App";
import "./index.css";

// REACT  19
// createRoot(document.getElementById("root")).render(
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// REACT 18
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// REACT 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
