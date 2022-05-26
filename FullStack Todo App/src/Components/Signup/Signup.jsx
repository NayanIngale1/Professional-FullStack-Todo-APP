import React, { useState } from "react";
import "./Signup.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography } from "@mui/material";

const MySignup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Password and Confirm password not matched", { variant: "error" });
      return;
    }

    let res = await fetch(`https://nayan-todo-app.herokuapp.com/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  

    console.log("res:", res);

    res.errors
      ? enqueueSnackbar(res.message, { variant: "error" })
      : enqueueSnackbar(res.message, { variant: "success" });

    if (!res.errors) {
      setFormData({});
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="signup_form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box component="span" id="signup_form_box">
          <Typography variant="h4" component="div">
            Sign Up
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            size="small"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
            size="small"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            size="small"
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            size="small"
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Mobile"
            variant="outlined"
            size="small"
            name="mobile"
            type="number"
            onChange={(e) => handleChange(e)}
          />   

          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            {" "}
            Submit{" "}
          </Button>
          <Link to="/login">
            {" "}
            <Typography component="div">Already have an Account ?</Typography>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export const Signup = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MySignup />
    </SnackbarProvider>
  );
};

//api link - https://masai-api-mocker.herokuapp.com/

//   register link - https://masai-api-mocker.herokuapp.com/auth/register

// login link - https://masai-api-mocker.herokuapp.com/auth/login
