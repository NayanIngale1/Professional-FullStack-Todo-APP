import React from "react";
import { Signup } from "./Components/Signup/Signup";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import { Login } from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import {NewTask} from "./Components/NewTask/NewTask";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="body_container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newtask" element={<NewTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
