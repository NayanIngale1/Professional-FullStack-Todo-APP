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
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ isLoggedin, children }) => {
  return isLoggedin ? children : <Navigate to="/login" />;
};

function App() {
  const user = useSelector((state) => state.user);
  const { loggedin } = user;
  return (
    <>
      <div className="App">
        <Sidebar />
        <div className="body_container">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/newtask"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <NewTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/alltodos"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <AllTodos />
                </PrivateRoute>
              }
            />
            <Route
              path="/personaltodos"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <PersonalTodos />
                </PrivateRoute>
              }
            />
            <Route
              path="/officialtodos"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <OfficialTodos />
                </PrivateRoute>
              }
            />
            <Route
              path="/othertodos"
              element={
                <PrivateRoute isLoggedin={loggedin}>
                  <OtherTodos />
                </PrivateRoute>
              }
            />
          </Routes>
          {/* <footer id="footer">Copyright @ Nayan, 2022</footer> */}
        </div>
      </div>
    </>
  );
}

export default App;
