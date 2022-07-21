import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App, { baseurl } from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Swal from "sweetalert2";
import createAuthRefreshInterceptor from "axios-auth-refresh";

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
    // res.headers["Authorization"] = "Bearer " + localStorage.getItem("access");

    // if (res.status === 200) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: res.data.success,
    //     showConfirmButton: true,
    //   });
    // }

    if (res.status === 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.success,
        showConfirmButton: true,
      });
    }
    if (res.status === 202) {
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
    console.log(err);
    const orgreq = err.config;
    if (err.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Data!",
      });
    }
    if (
      err.response.status === 401 &&
      err.response.data.detail === "Given token not valid for any token type"
    ) {
      const ref = localStorage.getItem("refresh");
      // orgreq._retry = true;
      return axios
        .post(`${baseurl}/account/refresh_token/`, { refresh: ref })
        .then((res) => {
          console.log(orgreq);
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          orgreq.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access");
          return axios(orgreq);
        })
        .catch((error) => {
          console.log(error);
          console.log("heloooooooooooooooooooooo");
          if (error.response.data.detail === "Token is invalid or expired") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Session Timed Out!",
            });
            axios
              .post(`${baseurl}/account/logout/`, { refresh: ref })
              .then((res) => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "http://localhost:3000/login";
                return;
              });
          }
        });
    }
    return Promise.reject(err);
  }
);
// console.log(err.request);
// if (err.response.status >= 400) {
//   Swal.fire({
//     icon: "error",
//     title: "Oops...",
//     text: err.response.data.detail,
//     footer: '<a href="">Why do I have this issue?</a>',
//   });
// }

// const refreshAuthLogic = (failedreq) => {
//   if (failedreq.response.status === 401) {
//     const ref = localStorage.getItem("refresh");
//     axios
//       .post(`${baseurl}/account/refresh_token/`, { refresh: ref })
//       .then((res) => {
//         localStorage.setItem("access", res.data.access);
//         localStorage.setItem("refresh", res.data.refresh);
//       });
//     return Promise.resolve();
//   }
// };
// createAuthRefreshInterceptor(axios, refreshAuthLogic);

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
