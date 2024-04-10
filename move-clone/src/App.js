import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import { useSelector } from "react-redux";
import Maps from "./Driver/Maps";
import CreateRoute from "./Component/Home/CreateRoute";
import GoogleMaps from "./Component/Home/GoogleMaps"
import MyOrdering from "./Component/MyOrdering";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreateRoute" element={<CreateRoute />} />
        <Route path="/maps" element={<GoogleMaps />} />
        <Route path="/DriverMap" element={<Maps />} />
        <Route path="MyOrdering" element={<MyOrdering />} />

      </Routes>
    </div>
  );
}


export default App;
