import "./App.css";
import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
import Aodashb from "./components/Aodashb";
import MainNav from "./components/MainNav";
import Aoloapp from "./components/Aoloapp";
import Home from "./components/Home";
import Addhall from "./components/Addhall";
import Bookings from "./components/Bookings";
import Bookingfm from "./components/Bookingfm";

// const baseurl = "http://10.21.86.48:8000";
const baseurl = "http://10.21.86.62:8000";

function App() {
  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Aoloapp />} />
        <Route
          path="dashboard/*"
          element={<Aodashb className="h-screen w-screen" />}
        ></Route>
      </Routes>
    </>
  );
}

export { baseurl };
export default App;
