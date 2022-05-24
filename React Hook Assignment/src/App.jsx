import React from "react";
import { Signup } from "./Components/Signup/Signup";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import { Login } from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import TodoCard from "./Components/TodoCard/TodoCard";
import { NewTask } from "./Components/NewTask/NewTask";
import AllTodos from "./Components/AllTodos/AllTodos";
import PersonalTodos from "./Components/PersonalTodos/PersonalTodos";
import OfficialTodos from "./Components/OfficialTodos/OfficialTodos";
import OtherTodos from "./Components/OtherTodos/OtherTodos";



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
          <Route path="/alltodos" element={<AllTodos />} />
          <Route path="/personaltodos" element={<PersonalTodos />} />
          <Route path="/officialtodos" element={<OfficialTodos />} />
          <Route path="/othertodos" element={<OtherTodos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
