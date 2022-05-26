import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/User/action";
import { Stack, Button, CircularProgress, Typography } from "@mui/material";
import { addAllTodo, setLoading, getData } from "../../Redux/Todo/action";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allTodos = useSelector((state) => state.todo);
  const { loading } = allTodos;

  useEffect(() => {
    dispatch(setLoading(true));

    const id = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("TodoUser"));
    if (user) {
      dispatch(addUser(user));
    }    
    dispatch(getData(user.users.email));
  }, []);

  return (
    <>
      <Loading />
      <div>
        <h1>Welcome To Home {user?.user?.users?.name?.split(" ")[0]} </h1>
      </div>
      {loading == false && user.loggedin && (
        <>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Todos Summary :
          </Typography>
          <Stack direction="column" alignItems="flex-start" spacing={2} p={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              id="outer_summary_box"
            >
              <Button variant="outlined" color="warning" size="large">
                All
              </Button>
              <Button variant="contained" color="primary" size="large">
                {allTodos.todos.length}
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              id="outer_summary_box"
            >
              <Button variant="outlined" color="warning" size="large">
                Personal
              </Button>
              <Button variant="contained" color="primary" size="large">
                {allTodos.personalTodos.length}
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              id="outer_summary_box"
            >
              <Button variant="outlined" color="warning" size="large">
                Officical
              </Button>
              <Button variant="contained" color="primary" size="large">
                {allTodos.officialTodos.length}
              </Button>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              id="outer_summary_box"
            >
              <Button variant="outlined" color="warning" size="large">
                Others
              </Button>
              <Button variant="contained" color="primary" size="large">
                {allTodos.otherTodos.length}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default Home;
