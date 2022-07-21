import "./App.css";
import "antd/dist/antd.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Aodashb from "./components/Aodashb";
import MainNav from "./components/MainNav";
import Aoloapp from "./components/Aoloapp";
import Home from "./components/Home";
import { useState } from "react";
// const baseurl = "http://10.21.86.48:8000";
// const baseurl = "http://10.21.86.110:5000";
const baseurl = "https://api-hall-booking-module.herokuapp.com";

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  console.log(loggedIn);
  return (
    <>
      <MainNav login={setloggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard/*"
          element={<Aodashb className="h-screen w-screen" />}
        />
        <Route
          path="login"
          element={<Aoloapp login={setloggedIn} lo={loggedIn} />}
        />
        ;
      </Routes>
    </>
  );
}

export { baseurl };
export default App;

// https://react-hall-booking-an8e5deym-realokd06-gmailcom.vercel.app/
