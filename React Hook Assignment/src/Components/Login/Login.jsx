import React, { useState } from "react";
import "./Login.css";
import { SnackbarProvider, useSnackbar } from "notistack";

import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "../../Redux/User/action";

const MyLogin = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    let res = await fetch("https://nayan-todo-app.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      
    
    if (res.errors) {
      enqueueSnackbar(res.message, { variant: "error" });
      return;
    }

    console.log("res:", res);

    if (res.token) {
      let token = res.token;

      dispatch(addToken(token));

      let data = await fetch(
        `https://nayan-todo-app.herokuapp.com/user/${res.user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      
      if (!data.error) {
        setFormData({});

        enqueueSnackbar(`Welcome ${data.users.name}`, { variant: "success" });
        setTimeout(() => {
          dispatch(addUser(data));
          localStorage.setItem("TodoUser", JSON.stringify(data));
          navigate("/");
        }, 1500);
      }
    }

    res.error && enqueueSnackbar(res.message, { variant: "error" });
  };

  return (
    <div className="login_form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box component="span" id="login_form_box">
          <Typography variant="h4" component="div">
            Sign In
          </Typography>
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

          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            {" "}
            Submit{" "}
          </Button>

          <Link to="/signup">
            {" "}
            <Typography component="div"> New User ? Register here</Typography>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export const Login = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyLogin />
    </SnackbarProvider>
  );
};

//api link - https://masai-api-mocker.herokuapp.com/

//   register link - https://masai-api-mocker.herokuapp.com/auth/register

// login link - https://masai-api-mocker.herokuapp.com/auth/login
