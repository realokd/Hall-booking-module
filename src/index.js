import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Swal from "sweetalert2";

// For GET requests
axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    req.headers["Authorization"] = "Bearer " + localStorage.getItem("access");
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    res.headers["Authorization"] = "Bearer " + localStorage.getItem("access");

    if (res.status === 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.success,
        showConfirmButton: true,
      });
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
