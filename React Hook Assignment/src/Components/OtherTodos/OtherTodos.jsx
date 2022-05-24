import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container, Grid } from "@mui/material";
import TodoCard from "../TodoCard/TodoCard";
import Loading from "../Home/Loading";
import { setLoading } from "../../Redux/Todo/action";

const OtherTodos = () => {
  const otherTodos = useSelector((state) => state.todo.otherTodos);
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
            Other Todos
          </Typography>
          <div id="grid_container">
            {otherTodos.map((todo) => (
              <TodoCard todo={todo} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default OtherTodos;
