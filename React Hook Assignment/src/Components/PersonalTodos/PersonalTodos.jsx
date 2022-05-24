import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container, Grid } from "@mui/material";
import TodoCard from "../TodoCard/TodoCard";
import Loading from "../Home/Loading";
import { setLoading } from "../../Redux/Todo/action";

const PersonalTodos = () => {
  const personalTodos = useSelector((state) => state.todo.personalTodos);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));

    const id = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Personal Todos
          </Typography>
          <div id="grid_container">
            {personalTodos.map((todo) => (
              <TodoCard todo={todo} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default PersonalTodos;
